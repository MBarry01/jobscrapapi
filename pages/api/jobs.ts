import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import algoliasearch from "algoliasearch";

const client = algoliasearch("Q3E5Y56YF4", "5f0e550b9ede2710482ad296ad3b3cae");
const index = client.initIndex("study-market-jobs");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get("https://remoteok.com/api");
    const jobs = response.data.filter((job: any) => job.id && job.slug);

    const MAX_SIZE = 10000;
    const cleanedJobs = jobs.map((job: any) => {
      if (job.description?.length > 5000) {
        job.description = job.description.slice(0, 5000) + "...";
      }
      delete job.markdown;
      delete job.tags;
      delete job.logo;
      delete job.company_logo;
      return job;
    });

    const filteredJobs = cleanedJobs.filter(
      (job: any) => Buffer.byteLength(JSON.stringify(job), "utf8") <= MAX_SIZE
    );

    await index.saveObjects(filteredJobs, {
      autoGenerateObjectIDIfNotExist: true,
    });

    res.status(200).json({ message: "Envoyé vers Algolia", count: filteredJobs.length });
  } catch (err: any) {
    res.status(500).json({ error: "Erreur", details: err.message });
  }
}
