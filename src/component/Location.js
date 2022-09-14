import React, { useState, useEffect, useRef } from "react";
import "./Location.css";
import stopData from "../data/stop.json";
import stopTimesData from "../data/stop_times.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function Location({
  setStopX,
  setStopY,
  setMoveCameraToggle,
  moveCameraToggle,
  setBusLocationName,
}) {
  useEffect(() => {
    stopData.map((el) => {
      let id = el.stop_id; //バス停idを取り出し
      let stopTimes = stopTimesData.filter((element) => {
        return element.stop_id === id;
      });
      el.stop_times = stopTimes; //そのidの時刻表を取り出して入れます。
    });
  }, []);
  const delay = 5000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  //時間制限がありの繰り返すのリセット
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  //無限の繰り返すFunction
  useEffect(() => {
    if (stopData) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === stopData.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
      setStopX(stopData[index].stop_lat);
      setStopY(stopData[index].stop_lon);
      setBusLocationName(stopData[index].stop_name);
      if (moveCameraToggle) {
      } else {
        setMoveCameraToggle(true);
      }
      return () => {
        resetTimeout();
        //有効するため一旦止まらないといけない
      };
    }
  }, [index]);
  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {stopData.map((el, index) => (
          <div className="slide" key={index}>
            <p className="stopName">{el.stop_name}</p>
            <div className="stopInfo">
              <div className="stopTimes">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>バス店名</TableCell>
                        <TableCell align="right">到着時間</TableCell>
                        <TableCell align="right">出発時間</TableCell>
                        <TableCell align="right">トリップ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {el.stop_times ? (
                          <>
                            {el.stop_times.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.stop_headsign}
                                </TableCell>
                                <TableCell align="right">
                                  {row.arrival_time}
                                </TableCell>
                                <TableCell align="right">
                                  {row.departure_time}
                                </TableCell>
                                <TableCell align="right">
                                  {row.trip_id}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
