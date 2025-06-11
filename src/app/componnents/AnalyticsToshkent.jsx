"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Oyga tegishli barcha sanalarni qaytaruvchi funksiya
function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const result = [];
  while (date.getMonth() === month) {
    const dayStr = `${date.getFullYear()}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    result.push(dayStr);
    date.setDate(date.getDate() + 1);
  }
  return result;
}

export default function AnalyticsToshkent() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  useEffect(() => {
    const fetchData = async () => {
      const [year, monthStr] = selectedMonth.split("-");
      const month = Number(monthStr) - 1;

      const { data: rows, error } = await supabase
        .from("infos_toshkent")
        .select("yangi_lid, shartnoma_oldi, tolov, created_at")
        .gte("created_at", `${selectedMonth}-01`)
        .lt(
          "created_at",
          `${year}-${String(Number(monthStr) + 1).padStart(2, "0")}-01`
        );

      if (error) {
        console.error("Xatolik:", error);
        return;
      }

      const grouped = {};
      rows.forEach((row) => {
        const d = new Date(row.created_at);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;

        if (!grouped[dateStr]) {
          grouped[dateStr] = {
            date: dateStr,
            yangi_lid: 0,
            shartnoma_oldi: 0,
            tolov: 0,
          };
        }

        grouped[dateStr].yangi_lid += Number(row.yangi_lid || 0);
        grouped[dateStr].shartnoma_oldi += Number(row.shartnoma_oldi || 0);
        grouped[dateStr].tolov += Number(row.tolov || 0);
      });

      const allDays = getAllDaysInMonth(Number(year), month);
      const finalData = allDays.map((day) => ({
        date: day,
        yangi_lid: grouped[day]?.yangi_lid || 0,
        shartnoma_oldi: grouped[day]?.shartnoma_oldi || 0,
        tolov: grouped[day]?.tolov || 0,
      }));

      setData(finalData);
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div style={{ padding: 20, width: "100%" }}>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Oy tanlang:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border px-2 py-1 rounded"
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <div>
          <BarChart width={data.length * 50} height={550} data={data}>
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={70}
              className="mb-4"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="yangi_lid" fill="#0ee818" name="Yangi lid" />
            <Bar
              dataKey="shartnoma_oldi"
              fill="#0000f6"
              name="Shartnoma oldi"
            />
            <Bar dataKey="tolov" fill="#ed0000" name="To‘lov" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
