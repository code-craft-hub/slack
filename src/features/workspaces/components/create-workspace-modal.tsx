"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    setName("");
    // TODO: Clear form
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success("Workspace created")
          handleClose()
          router.push(`/workspace/${id}`);
        },
      }
    );
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a workspace</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              disabled={isPending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              minLength={3}
              placeholder="Workspace name e.g 'Work', 'Personal', 'Home, "
            />
            <div className="flex justify-end">
              <Button disabled={isPending}>Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
