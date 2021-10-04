package services;


import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.appengine.api.utils.SystemProperty;
import java.sql.Statement;

import conn.Connections;
import data.Info;
@Path("/counterservice")
public class CounterService {
	
		@POST
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Consumes(MediaType.APPLICATION_JSON)//Method receives object as a JSON string
		@Path("/addjsonfish")
		public Info receiveJsonFish(Info info) {
			System.out.println("bs");
			String sql="insert into info(pedestrians, car, cyclist, bus, trucks, scooters, motorcycles, SessionID, UserID, Date, longitude,latitude) values(?,?,?,?,?,?,?,?,?,?,?,?)";
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			PreparedStatement pstmt;
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1, info.getPedestrians());
				pstmt.setInt(2, info.getCar());
				pstmt.setInt(3, info.getCyclist());
				pstmt.setInt(4, info.getBus());
				pstmt.setInt(5, info.getTrucks());
				pstmt.setInt(6, info.getScooters());
				pstmt.setInt(7, info.getMotorcycles());
				pstmt.setInt(8, info.getSessionId());
				pstmt.setInt(9, info.getUserId());
				pstmt.setString(10, info.getDate());
				pstmt.setFloat(11, info.getLongitude());
				pstmt.setFloat(12, info.getLatitude());
				pstmt.execute();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			
			info.setPedestrians(info.getPedestrians()+" modified");
			return info;
		}
//		
		@GET
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Path("/getAll")
		public ArrayList<Info> getAllInfo() {
			String sql="select * from info";
			ResultSet RS=null;
			ArrayList<Info> list=new ArrayList<>();
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Statement stmt;
			try {
				stmt = conn.createStatement();
				RS=stmt.executeQuery(sql);
				while (RS.next()) {
					Info f=new Info();
					f.setId(RS.getInt("id"));
					f.setPedestrians(RS.getInt("pedestrians"));
					f.setCar(RS.getInt("car"));
					f.setCyclist(RS.getInt("cyclist"));
					f.setBus(RS.getInt("bus"));
					f.setTrucks(RS.getInt("trucks"));
					f.setScooters(RS.getInt("scooters"));
					f.setMotorcycles(RS.getInt("motorcycles"));
					f.setSessionId(RS.getInt("SessionID"));
					f.setUserId(RS.getInt("UserID"));
					f.setDate(RS.getString("Date"));
					f.setLongitude(RS.getFloat("longitude"));
					f.setLatitude(RS.getFloat("latitude"));
					list.add(f);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			return list;
		}
}
