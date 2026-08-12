"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Legend, 
  XAxis, 
  YAxis, 
  Tooltip,
} from "recharts";

export function Chart() {
  return (
    <ResponsiveContainer height={400} width="200%">
      <BarChart
        accessibilityLayer
        barCategoryGap="10%"
        barGap={4}
        data={[
          { amt: 1400, name: "Janeiro", pv: 800, uv: 590 },
          { amt: 1400, name: "Fevereiro", pv: 800, uv: 590},
          { amt: 1506, name: "Março", pv: 967, uv: 868 },
          { amt: 989, name: "Abril", pv: 1098, uv: 1397 },
          { amt: 1228, name: "Maio", pv: 1200, uv: 1480 },
          { amt: 1100, name: "Junho", pv: 1108, uv: 1520 },
          { amt: 1700, name: "Julho", pv: 680, uv: 1400 },
        ]}
        layout="horizontal"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        {/* Adiciona os rótulos do eixo X (Meses...) */}
        <XAxis dataKey="name" />

        {/* Adiciona a escala numérica no eixo Y */}
        <YAxis />

        {/* Exibe o balão com informações ao passar o mouse */}
        <Tooltip />

        {/* Exibe a legenda explicativa do gráfico */}
        <Legend verticalAlign="top" height={36} />

        {/* 'name' define o texto que vai aparecer na legenda */}
        <Bar dataKey="uv" name="Gastos" fill="gray" />

      </BarChart>
    </ResponsiveContainer>
  );
}
