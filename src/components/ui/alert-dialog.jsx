"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

function combinarClases(...clases) {
  return clases.filter(Boolean).join(" ");
}

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlay({ className, ref, ...props }) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={combinarClases(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({ className, ref, ...props }) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={combinarClases(
          "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-7 overflow-hidden rounded-[28px] border border-white/10 bg-[#0b100e] bg-[radial-gradient(circle_at_top_right,rgba(140,234,176,0.12),transparent_46%)] p-7 text-white shadow-[0_32px_100px_-24px_rgba(0,0,0,0.9)] ring-1 ring-[#b8f5c8]/10 outline-none before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#b8f5c8]/70 before:to-transparent before:content-[''] sm:p-9",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }) {
  return (
    <div
      className={combinarClases("flex flex-col gap-3 text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      className={combinarClases(
        "flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ref, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={combinarClases("max-w-[24ch] text-[1.65rem] leading-tight font-semibold tracking-[-0.04em] text-white sm:text-[1.85rem]", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ref, ...props }) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={combinarClases("max-w-[50ch] text-sm leading-6 text-[#a8b8af] sm:text-[15px]", className)}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ref, ...props }) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={combinarClases(
        "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#b8f5c8] px-6 text-sm font-semibold text-[#08140d] shadow-[0_10px_30px_-14px_rgba(184,245,200,0.9)] transition-colors hover:bg-[#d4ffdf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8f5c8]",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogCancel({ className, ref, ...props }) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={combinarClases(
        "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-[#e7f0e9] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8f5c8]",
        className
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
