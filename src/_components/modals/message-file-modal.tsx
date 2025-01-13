"use client";

import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import FileUpload from "@/app/(platform)/app/_components/file-upload";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required",
  }),
});

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "messageFile";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const values = form.getValues();

  useEffect(() => {
    setIsLoading(form.formState.isSubmitting);
  }, [form.formState.isSubmitting]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });

      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="  p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Upload some file here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            suppressHydrationWarning
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          {field.value ? (
                            <div className="relative w-full h-20 flex justify-center">
                              <div className="relative rounded-full overflow-hidden">
                                <Image
                                  alt="Server picture"
                                  src={field.value}
                                  width={100}
                                  height={100}
                                  style={{ objectFit: "cover" }}
                                  className="w-20 h-20"
                                />
                                <button
                                  className="absolute top-0 right-0 h-full w-full flex justify-center items-center group"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    form.setValue("fileUrl", "");
                                    router.refresh();
                                  }}
                                >
                                  <X className="w-8 h-8 stroke-transparent group-hover:stroke-red-600 transition-all" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <FileUpload
                              setIsLoading={setIsLoading}
                              endpoint="messageFile"
                              onChange={field.onChange}
                            />
                          )}
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4 justify-center">
              <Button
                className="w-full"
                disabled={!values.fileUrl || isLoading}
              >
                Send attachment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
