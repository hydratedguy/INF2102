import { useEffect } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPlants, setSelectedPlant } from "../../store/slices/plantsSlice";
import { Dropdown } from "../molecules";
import { Spinner, Text } from "../atoms";

export default function PlantsDropdown() {
  const dispatch = useAppDispatch();
  const { items, selected, loading, error } = useAppSelector(
    (state) => state.plants
  );

  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);

  if (loading) {
    return (
      <Box>
        <Spinner size={20} />
      </Box>
    );
  }

  if (error) {
    return <Text color="error">{error}</Text>;
  }

  const options = items.map((p) => ({
    id: String(p.id),
    label: p.empresa ?? "Unknown",
  }));

  return (
    <Dropdown
      label="Biomethane Plant"
      options={options}
      value={selected}
      onChange={(v) => dispatch(setSelectedPlant(v))}
    />
  );
}
