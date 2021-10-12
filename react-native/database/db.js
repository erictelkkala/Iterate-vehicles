import React from 'react'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('infoTemp.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists infoTemp (ID integer primary key autoincrement not null, car integer not null, bus integer not null, trucks integer not null, motorcycles integer not null, SessionID integer not null, UserID integer not null, Date text not null, longitude real not null,  latitude real not null, Timer text not null);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const addInfo = (
  car,
  bus,
  trucks,
  motorcycles,
  SessionID,
  UserID,
  Date,
  longitude,
  latitude,
  Timer
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into infoTemp(car, bus, trucks, motorcycles, SessionID, UserID, Date, longitude, latitude,Timer) values(?,?,?,?,?,?,?,?,?,?);',
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
          Timer,
        ],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const fetchAllInfo = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from infoTemp;',
        [],
        (tx, result) => {
          resolve(result)
        },
        (tx, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}
export const fetchAllInfoBasedOnUser = (UserID) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from infoTemp where UserID=?;',
        [],
        (tx, result) => {
          resolve(result)
        },
        (tx, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}
