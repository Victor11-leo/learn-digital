/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as applicants from "../applicants.js";
import type * as certifications from "../certifications.js";
import type * as chapters from "../chapters.js";
import type * as companies from "../companies.js";
import type * as courses from "../courses.js";
import type * as jobs from "../jobs.js";
import type * as lessons from "../lessons.js";
import type * as questions from "../questions.js";
import type * as quizes from "../quizes.js";
import type * as students from "../students.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  applicants: typeof applicants;
  certifications: typeof certifications;
  chapters: typeof chapters;
  companies: typeof companies;
  courses: typeof courses;
  jobs: typeof jobs;
  lessons: typeof lessons;
  questions: typeof questions;
  quizes: typeof quizes;
  students: typeof students;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
