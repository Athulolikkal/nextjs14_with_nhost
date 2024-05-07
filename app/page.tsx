"use client";
import instance from "@/axios/axios";
import { addCourseQuery } from "@/gql/course";
import nhost from "@/nhost/nhostConfig";
import { handleImageUpload } from "@/nhost/nhostImageUpload";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const tagRef = useRef<any>(null);
  const priceRef = useRef<any>(null);
  const creatorRef = useRef<any>(null);
  const [courseType, setCourseType] = useState<string | null>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const titleData = titleRef?.current?.value;
    const descriptionData = descriptionRef.current.value;
    const tagData = tagRef.current.value;
    const priceData = priceRef.current.value;
    const creatorData = creatorRef.current.value;

    if (
      creatorData &&
      titleData &&
      descriptionData &&
      tagData &&
      priceData &&
      courseType != null &&
      selectedImage != undefined
    ) {
      setLoading(true);
      const imageUrl = await handleImageUpload(selectedImage);

      const addCourseDetailsQuery = await addCourseQuery(
        creatorData,
        descriptionData,
        priceData,
        imageUrl,
        tagData,
        titleData,
        courseType
      );
      const addCoursesDb = await instance.post("", {
        query: addCourseDetailsQuery,
      });

      if (addCoursesDb.data.errors && addCoursesDb.data.errors.length > 0) {
        window.alert("Something went wrong");
      } else {
        window.alert("Added successfully");
        e.target.reset();
        setSelectedImage(undefined);
        setCourseType(null);
      }
      setLoading(false);
    } else {
      window.alert("please enter all the data");
    }
  };

  const handleChangeImage = (imgBlob: any) => setSelectedImage(imgBlob);
  const handleChangeType = (event: any) => setCourseType(event.target.value);

  return (
    <main>
      <div className="p-5 ">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900 text-center text-2xl">
                Upload Course Details
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
                        placeholder="Enter the title"
                        ref={titleRef}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ref={descriptionRef}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                {/* <div className="col-span-full"> */}
                {/* <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label> */}
                {/* <div className="mt-2 flex items-center gap-x-3"> */}
                {/* <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                {/* <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button> */}
                {/* </div> */}
                {/* </div> */}

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          {
                            <span>
                              {selectedImage === undefined
                                ? "Upload a file"
                                : "Change Image"}
                            </span>
                          }
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleChangeImage}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Tag
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

                {/* <div className="sm:col-span-3">
              <label htmlFor="=creator" className="block text-sm font-medium leading-6 text-gray-900">
                Creator
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="creator"
                  id="creator"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

                {/* <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Course
                  </label>
                  <div className="mt-2">
                    <select
                      id="course"
                      name="course"
                      // autoComplete="course"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleChangeType}
                    >
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      <option value="webinar">Webinar</option>
                      <option value="course">Course</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  {/* <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label> */}
                  {/* <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div> */}
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="tag"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tag
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="tag"
                      id="tag"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ref={tagRef}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="creator"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Creator
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="creator"
                      id="creator"
                      autoComplete="creator"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ref={creatorRef}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ref={priceRef}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Notifications
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div> */}
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              disabled={loading}
            >
              {loading ? "loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
