import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Autocomplete from "@mui/joy/Autocomplete";
import CircularProgress from "@mui/joy/CircularProgress";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Terminal({ onTerminalChange }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...Terminals]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <FormControl id="asynchronous-demo">
      <FormLabel sx={{ color: "hsl(215, 15%, 75%)" }}>
        Filter By Terminal
      </FormLabel>
      <Autocomplete
        sx={{ width: 300 }}
        placeholder="Filter By Terminal"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        onChange={(event, value) => onTerminalChange(value)}
        endDecorator={
          loading ? (
            <CircularProgress
              size="sm"
              sx={{ bgcolor: "background.surface" }}
            />
          ) : null
        }
      />
    </FormControl>
  );
}

const Terminals = ["T1", "T2", "T3"];
