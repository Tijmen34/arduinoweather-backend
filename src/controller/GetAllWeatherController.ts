import {Request, Response} from "express";
import {BMP280} from "../model/BMP280";
import {DHT11} from "../model/DHT11";
import {DS18B20} from "../model/DS18B20";
import {Openweather} from "../model/Openweather";

export function getAllWeatherController(req: Request, res: Response) {
  const bmp280Promise = BMP280.findAll();
  const dht11Promise = DHT11.findAll();
  const ds18b20Promise = DS18B20.findAll();
  const openweatherPromise = Openweather.findAll();

  const promisesArray = [bmp280Promise, dht11Promise, ds18b20Promise, openweatherPromise];

  Promise.all(promisesArray)
    .then(promiseValues => {
      res.status(200).send({
        BMP280: promiseValues[0],
        DHT11: promiseValues[1],
        DS18B20: promiseValues[2],
        Openweather: promiseValues[3]
      })
    })
    .catch(err => {
      console.log(Date.now() + "[AllWeatherController] - Failed while retrieving weatherdates: ", err);
      res.status(500).send({
        Error: err
      })
    })
}
