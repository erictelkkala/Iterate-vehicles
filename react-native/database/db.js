import React from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('infoTemp.db');

//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			//By default, primary key is auto_incremented - we do not add anything to that column
			tx.executeSql(
				'create table if not exists infoTemp (ID int primary key auto_increment not null, car int not null, bus int not null, trucks int not null, motorcycles int not null, SessionID int not null, UserID int not null, Date varchar(255) not null, longitude float not null,  latitude float not null);',
				//second parameters of execution:empty brackets - this parameter is not needed when creating table
				[],
				//If the transaction succeeds, this is called
				() => {
					resolve();
				},
				//If the transaction fails, this is called
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const addInfo = (
	car,
	bus,
	trucks,
	motorcycles,
	SessionID,
	UserID,
	Date,
	longitude,
	latitude
) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			//Here we use the Prepared statement, just putting placeholders to the values to be inserted
			tx.executeSql(
				'insert into infoTemp(car, bus, trucks, motorcycles, SessionID, UserID, Date, longitude, latitude) values(?,?,?,?,?,?,?,?,?);',
				//And the values come here
				[
					car,
					bus,
					trucks,
					motorcycles,
					SessionID,
					UserID,
					Date,
					longitude,
					latitude,
				],
				//If the transaction succeeds, this is called
				(_, result) => {
					resolve(result);
				},
				//If the transaction fails, this is called
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const fetchAllInfo = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			//Here we select all from the table infoTemp
			tx.executeSql(
				'select * from infoTemp;',
				[],
				(tx, result) => {
					resolve(result);
				},
				(tx, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
