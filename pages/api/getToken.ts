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
      const { username, password } = req.query
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)

      const requestOptions: any = {
        method: "POST",
        body: formData
      }

      // Fetch token from NJ Transit API
      const tokenResponse = await fetch(
        "https://raildata.njtransit.com/api/TrainData/getToken",
        requestOptions
      )

      // Extract token from the response
      const json = await tokenResponse.json()

      res.status(200).json(json)
    } catch (error) {
      console.error("Error fetching token:", error)
      res.status(500).json({ error: "Token fetching failed" })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}
