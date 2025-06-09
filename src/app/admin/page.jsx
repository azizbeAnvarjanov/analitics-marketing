"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
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
    const { error } = await supabase.from("infos").insert([
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
    <main style={{ padding: 20 }}>
      <h1>Infops Maʼlumot Kiritish</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: 300,
        }}
      >
        <input
          name="yangi_lid"
          placeholder="Yangi lid"
          value={formData.yangi_lid}
          onChange={handleChange}
        />
        <input
          name="shartnoma_oldi"
          placeholder="Shartnoma oldi"
          value={formData.shartnoma_oldi}
          onChange={handleChange}
        />
        <input
          name="tolov"
          placeholder="To‘lov"
          value={formData.tolov}
          onChange={handleChange}
        />
        <button type="submit">Yuborish</button>
      </form>
    </main>
  );
}
