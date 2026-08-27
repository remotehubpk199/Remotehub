const SHEET_ID = "1wEFesmyYm898huJec2X0LlWfq-fUqp4pOT7LoeyKQnQ";
const SHEET_NAME = "Sheet1";

let products = [];

async function loadProducts() {

  try {

    const url =
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    const response = await fetch(url);
    const text = await response.text();

    const jsonText = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );

    const data = JSON.parse(jsonText);
    const rows = data.table.rows;

    products = rows.map(row => {

      const cells = row.c.map(cell =>
        cell && cell.v !== undefined ? cell.v : ""
      );

      return {
        name: cells[0] || "",
        category: cells[1] || "",
        price: cells[2] ? "Rs. " + cells[2] : "",
        image: cells[3] || "",
        image2: cells[4] || "",
        description: cells[5] || ""
      };

    }).filter(product => product.name);

    renderProducts(products);

  } catch (error) {

    console.error("Google Sheet Error:", error);

    document.getElementById("productGrid").innerHTML =
      "<p style='grid-column:1/-1;text-align:center;padding:40px;'>Products could not be loaded.</p>";

  }

}
