"use client";

import React from "react";
import ContentPage from "@/app/components/contentPage";
import { Card, Statistic, DatePicker } from "antd";
import { FaCartArrowDown } from "react-icons/fa6";
import { GiWashingMachine, GiMoneyStack } from "react-icons/gi";
import {} from "react-icons/gi";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function Page() {
  return (
    <ContentPage>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 justify-center items-start">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4 justify-center items-start">
          <div>
            <Card size="small">
              <Statistic
                title="Order Masuk Hari Ini"
                value={11}
                valueStyle={{ color: "green" }}
                prefix={<FaCartArrowDown />}
              />
            </Card>
          </div>

          <div>
            <Card size="small">
              <Statistic
                title="Total Cucian Selesai Hari Ini"
                value={5}
                valueStyle={{ color: "green" }}
                prefix={<GiWashingMachine />}
              />
            </Card>
          </div>

          <div>
            <Card size="small">
              <Statistic
                title="Pendapatan Hari Ini"
                value={100000}
                precision={2}
                valueStyle={{ color: "green" }}
                prefix={<GiMoneyStack />}
              />
            </Card>
          </div>

          <div>
            <Card size="small">
              <Statistic
                title="Pendapatan Bulanan Ini"
                value={100000}
                precision={2}
                valueStyle={{ color: "green" }}
                prefix={<GiMoneyStack />}
              />
            </Card>
          </div>
        </div>

        <div>
          <Card
            size="small"
            title="Statistic"
            extra={<RangePicker className="my-2" />}
          >
            <LineChart
              dataset={[
                { date: "2024-01-01", total: 10 },
                { date: "2024-01-02", total: 15 },
                { date: "2024-01-03", total: 8 },
                { date: "2024-01-04", total: 12 },
                { date: "2024-01-05", total: 20 },
                { date: "2024-01-06", total: 18 },
                { date: "2024-01-07", total: 25 },
              ]}
              xAxis={[
                {
                  dataKey: "date",
                  scaleType: "band",
                  valueFormatter: (date) => dayjs(date).format("DD-MM-YYYY"),
                },
              ]}
              series={[{ dataKey: "total" }]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
