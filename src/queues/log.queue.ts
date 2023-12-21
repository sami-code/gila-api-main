import Bull from "bull";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const logQueue = new Bull("log", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

logQueue.process(async (job) => {
  await prisma.logHistory.create({
    data: job.data
  })
}
);

const logRecord = (data: any) => {
  logQueue.add(data);
}

export { logRecord }
