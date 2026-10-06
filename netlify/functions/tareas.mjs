import { getStore } from "@netlify/blobs";

const store = getStore("tareas-colegio");

export default async (req) => {
  try {
    if (req.method === "GET") {
      const tareas = await store.get("tareas", { type: "json" });

      return Response.json(tareas || {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: []
      });
    }

    if (req.method === "POST") {
      const datos = await req.json();

      await store.setJSON("tareas", datos);

      return Response.json({
        ok: true,
        mensaje: "Tareas guardadas correctamente"
      });
    }

    return new Response("Método no permitido", {
      status: 405
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      ok: false,
      error: "Error al guardar las tareas"
    }, {
      status: 500
    });
  }
};
