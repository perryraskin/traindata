// import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Cors from "cors"

//Imported Files
import initMiddleware from "../../lib/init-middleware"
import { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with these verbs
    methods: ["GET", "PUT", "PATCH", "POST", "OPTIONS", "DELETE"],
    origin: "*",
    allowedHeaders: "*",
    maxAge: 3600
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { user } = getSession(req, res);

  // Run cors
  await cors(req, res)

  try {
    try {
      const { token } = req.query
      const formData = new FormData()
      formData.append("token", token)

      const requestOptions: any = {
        method: "POST",
        body: formData
      }

      const stationsResponse = await fetch(
        "https://raildata.njtransit.com/api/TrainData/getStationList",
        requestOptions
      )

      const json = await stationsResponse.json()

      res.status(200).json(json)
    } catch (error) {
      console.error("Error fetching stations:", error)
      res.status(500).json({ error: "Stations fetching failed" })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}
