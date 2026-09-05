import "dotenv/config";
import express from "express";
import cors from "cors"

const app = express();
app.use(cors())

const port = 5000;

app.get("/", (req, res) => {
    res.send("Weather server is running!");
});


app.get("/api/weather/:location", async (req, res) => {

    try {

        const location = req.params.location;

        const apiKey = process.env.WEATHER_API_KEY;

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                message: "Unable to find weather for that location."
            });
        }

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Something went wrong while fetching the weather."
        });

    }

});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});