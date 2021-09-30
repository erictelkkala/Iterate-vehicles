package data;


public class Fish {
	private int id;
	private String breed;
	private float weight;
	private int length;
	private String city;
	private String water;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBreed() {
		return breed;
	}
	public void setBreed(String breed) {
		this.breed = breed;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public void setWeight(String s) {
		try {
			this.weight = Float.parseFloat(s);
		}
		catch(NumberFormatException e) {
			weight=-1;
		}
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public void setLength(String length) {
		try {
			this.length = Integer.parseInt(length);
		}
		catch(NumberFormatException e) {
			this.length=0;
		}
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getWater() {
		return water;
	}
	public void setWater(String water) {
		this.water = water;
	}
	public String toString() {
		return id+" "+breed+" "+weight+" "+length+" "+city+" "+water+"\n";
	}
}
