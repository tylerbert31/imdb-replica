import NodeCache from "node-cache";

const environment = process.env.ENVIRONMENT || "LOCAL";

const memcache = new NodeCache({
  stdTTL: 3600 * 24 * 30, // 24 * 30 hours
  checkperiod: 600, // Check every 10 minutes
  useClones: false, // Can improve performance
});

if (["LOCAL", "STAGING"].includes(environment.toUpperCase())) {
  // In your node_cache.js
  memcache.on("set", function (key, _) {
    console.log(`Cache SET - Key: ${key}`);
  });

  memcache.on("get", function (key, _) {
    console.log(`Cache GET - Key: ${key}`);
  });
}

export default memcache;
