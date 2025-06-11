"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminTosh() {
  const [formData, setFormData] = useState({
    yangi_lid: "",
    shartnoma_oldi: "",
    tolov: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*\.?\d*$/.test(value)) return; // faqat raqam va nuqta
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("infos_toshkent").insert([
      {
        yangi_lid: Number(formData.yangi_lid),
        shartnoma_oldi: Number(formData.shartnoma_oldi),
        tolov: Number(formData.tolov),
      },
    ]);

    if (error) {
      alert("Xatolik: " + error.message);
    } else {
      alert("Maʼlumot muvaffaqiyatli qoʻshildi!");
      setFormData({ yangi_lid: "", shartnoma_oldi: "", tolov: "" });
    }
  };

  return (
    <main className="p-4 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Toshkent</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="yangi_lid"
          placeholder="Yangi lid"
          value={formData.yangi_lid}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-[400px]"
        />
        <input
          name="shartnoma_oldi"
          placeholder="Shartnoma oldi"
          value={formData.shartnoma_oldi}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-[400px]"
        />
        <input
          name="tolov"
          placeholder="To‘lov"
          value={formData.tolov}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-[400px]"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-[400px]"
        >
          Yuborish
        </button>
      </form>
    </main>
  );
}
