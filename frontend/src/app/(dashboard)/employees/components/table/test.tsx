import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const TestAlert = () => {
    const [open, setOpen] = React.useState(true);

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger>Open</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay/>
                <AlertDialog.Content>
                    <form
                        onSubmit={(event) => {
                            // wait().then(() => setOpen(false));
                            event.preventDefault();
                        }}
                    >
                        {/** some inputs */}
                        <button type="submit">Submit</button>
                    </form>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};
