import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Crear el servidor
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

//2. Definir las herramientas
server.tool(
  "fetch_weather", //titulo de la herramienta
  "Tool to fetch the weather of a city", //descripcion de la herramienta
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `El clima de ${city} es soleado`,
        },
      ],
    };
  }
);

//3. Escuchar las conexiones del cliente
const transport = new StdioServerTransport()
await server.connect(transport)