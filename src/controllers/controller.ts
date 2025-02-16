"use server";

import memcache from "../lib/node-cache";
import redis from "../lib/redis";
import autoBind from "../lib/auto_bind";
import axios from "axios";

/**
 * ### Abstract Controller
 * ---
 * Developed by [tylerbert31](https://github.com/tylerbert31)
 */
abstract class Controller {
  protected readonly className = this.constructor.name;
  protected readonly environment: string = process.env.ENVIRONMENT || "LOCAL";

  protected readonly tmdbReadKey: string;
  protected readonly tmdbAPIKey: string;

  /**
   * ### Local Server Caching
   * ---
   * Node Cache
   */
  protected readonly memcache = memcache;

  /**
   * ### External Caching
   * ---
   * Upstash Redis
   */
  protected readonly redis: typeof redis;

  protected readonly axios = axios;

  /**
   * ### Axios GET Request
   */
  protected readonly get = axios.get;

  /**
   * ### Axios POST Request
   */
  protected readonly post = axios.post;

  constructor() {
    autoBind(this);

    // ~ Require TMDB Credentials
    if (!process.env.TMDB_READ_KEY || !process.env.TMDB_API_KEY) {
      throw new Error("Missing TMDB credentials");
    }

    this.tmdbReadKey = process.env.TMDB_READ_KEY;
    this.tmdbAPIKey = process.env.TMDB_API_KEY;

    // ~ Require Redis Credentials
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      throw new Error("Missing Redis credentials");
    }

    this.redis = redis;
  }

  /**
   * Set General Cache (Memcache | Redis)
   * @param key {string}
   * @param value {any}
   */
  protected async setCache(key: string, value: any) {
    this.memcache.set(key, value);
    await this.redis.set(key, value);
  }

  /**
   * Get General Cache (Memcache | Redis)
   * @param key {string}
   * @returns {Promise<any> | null}
   */
  protected async getCache(key: string): Promise<any | null> {
    // If Memcache data
    const memcacheData = this.memcache.get(key);
    if (memcacheData) {
      this.log("Memcache Data");
      return memcacheData;
    }

    // If Redis data
    const redisData = await this.redis.get(key);
    if (redisData) {
      this.log("Redis Data");
      this.memcache.set(key, redisData);
      return redisData;
    }
    return null;
  }

  /**
   * Logs a message to the console.
   * @param message {string | number | object | Array}
   */
  protected readonly log = (message: any) => {
    if (typeof message === "object" || Array.isArray(message)) {
      message = JSON.stringify(message);
    }
    console.log(`[ ${this.environment} ][ ${this.className}] ==> ${message}`);
  };

  /**
   * Check if the request body has the required key
   * @param body {any}
   * @param key {string}
   */
  protected validateRequest(body: any, key: string = "query") {
    if (!body || !body[key]) {
      return false;
    }
    return true;
  }
}

export default Controller;
