import React, { useCallback,useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import appwriteService from "../../AppWrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [loading, setLoading] = useState(false);


 const submit = async (data) => {
  setLoading(true);

  try {
    if (post) {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatedocument(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      let featuredImage = null;

      if (data.image?.[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        featuredImage = file?.$id || null;
      }

      const dbPost = await appwriteService.createDocuments({
        title: data.title,
        slug: data.slug,
        content: data.content,
        featuredImage,
        status: data.status,
        userId: userData.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  } catch (error) {
    console.error("Post submit failed:", error);
    alert("Failed to submit post. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap relative text-slate-200">
      {loading && (
  <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center rounded-xl">
    <div className="text-center">
      <div className="w-20 h-20 border-4 border-slate-700/50 rounded-full animate-spin border-t-blue-500 mx-auto" />
      <p className="mt-4 text-blue-400 font-semibold animate-pulse">
        Submitting post...
      </p>
    </div>
  </div>
)}
      <div className="w-full lg:w-2/3 px-2">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
            labelClassName="text-slate-300 font-medium mb-1"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
            labelClassName="text-slate-300 font-medium mb-1"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
              labelClassName="text-slate-300 font-medium mb-1 block"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 px-2 mt-4 lg:mt-0">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg h-fit">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4 bg-slate-800 border-slate-700 text-slate-200 file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-blue-500"
            labelClassName="text-slate-300 font-medium mb-1"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full rounded-lg border border-slate-700 object-cover shadow-md"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
            labelClassName="text-slate-300 font-medium mb-1"
            {...register("status", { required: true })}
          />
       <Button
  type="submit"
  disabled={loading}
  className={`w-full py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-200
    ${loading ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-0.5"}
  `}
  bgColor={
    post
      ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white"
      : "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
  }
>
  {loading
    ? post
      ? "Updating..."
      : "Submitting..."
    : post
    ? "Update Post"
    : "Submit Post"}
</Button>

        </div>
      </div>
    </form>
  );
}