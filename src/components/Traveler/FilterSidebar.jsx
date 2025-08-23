// import React from 'react';
// import {
//     Box,
//     Typography,
//     Slider,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Checkbox,
//     FormControlLabel,
//     FormGroup,
//     Button,
//     Stack,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// const amenitiesList = ['Water', 'Electricity', 'Sewage Hookups', 'Firepit', 'Wi-Fi'];
// const typeToSiteLists = ['Boondocking', 'RV Storage', 'Full Hookups', 'Some Hookups'];
// const typeToRV = ['Class A', 'Class B', 'Class C', '5th Wheel', 'Towable'];
// const lengthOptions = ['25 ft', '35 ft', '45 ft', '45+ ft'];
// const numberOfSlides = ['0 Slide', '1 Slide', '2 Slides', '3+ Slides'];

// const FilterSidebar = () => {
//     const [price, setPrice] = React.useState([0, 500]);
//     const [rating, setRating] = React.useState(null);
//     const [amenities, setAmenities] = React.useState([]);
//     const [selectedTypes, setSelectedTypes] = React.useState([]);
//     const [selectedRVTypes, setSelectedRVTypes] = React.useState([]);
//     const [selectedLength, setSelectedLength] = React.useState([]);
//     const [selectedSlides, setSelectedSlides] = React.useState([]);

//     const handleSlider = (event, newValue) => setPrice(newValue);

//     const handleRating = (value) => setRating(value);

//     const handleAmenity = (event) => {
//         const { value, checked } = event.target;
//         setAmenities((prev) =>
//             checked ? [...prev, value] : prev.filter((a) => a !== value)
//         );
//     };

//     const handleTypeSelection = (event) => {
//         const { value, checked } = event.target;
//         setSelectedTypes((prev) =>
//             checked ? [...prev, value] : prev.filter((item) => item !== value)
//         );
//     };

//     const handleRVTypeSelection = (event) => {
//         const { value, checked } = event.target;
//         setSelectedRVTypes((prev) =>
//             checked ? [...prev, value] : prev.filter((item) => item !== value)
//         );
//     }

//     const handleLengthSelection = (event) => {
//         const { value, checked } = event.target;
//         setSelectedLength((prev) =>
//             checked ? [...prev, value] : prev.filter((item) => item !== value)
//         );
//     }

//     const handleSlideSelection = (event) => {
//         const { value, checked } = event.target;
//         setSelectedSlides((prev) =>
//             checked ? [...prev, value] : prev.filter((item) => item !== value)
//         );
//     }
//     return (
//         <Box sx={{}}>
//             <Typography variant="h6" fontWeight={600} gutterBottom>
//                 Filters
//             </Typography>
//             {/* Price Accordion */}
//             <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
//                     <Typography fontWeight={600}>Price per Night</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ px: 0 }}>
//                     <Slider
//                         min={0}
//                         max={500}
//                         step={10}
//                         value={price}
//                         onChange={handleSlider}
//                         valueLabelDisplay="off"
//                         sx={{ color: 'teal', mb: 1 }}
//                     />
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
//                         <span>${price[0]}</span>
//                         <span>${price[1]}</span>
//                     </Box>
//                 </AccordionDetails>
//             </Accordion>

//             <hr className='border border-gray-300' />

//             {/* Rating Accordion */}
//             <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
//                     <Typography fontWeight={700}>Guest Rating</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ px: 0 }}>
//                     <Stack direction="row" spacing={1} mb={1}>
//                         {[0, 1, 2, 3, 4].map((num) => (
//                             <Button
//                                 key={num}
//                                 variant={rating === num ? 'contained' : 'outlined'}
//                                 size="small"
//                                 sx={{
//                                     minWidth: 38,
//                                     borderRadius: 2,
//                                     p: 0,
//                                     fontWeight: 600,
//                                     backgroundColor: rating === num ? 'teal' : 'white',
//                                     color: rating === num ? 'white' : 'teal',
//                                     borderColor: 'teal',
//                                     '&:hover': {
//                                         backgroundColor: rating === num ? '#008080' : '#f0f0f0',
//                                     },
//                                 }}
//                                 onClick={() => handleRating(num)}
//                             >
//                                 {num}+
//                             </Button>
//                         ))}
//                     </Stack>
//                 </AccordionDetails>
//             </Accordion>

//             {/* Amenities Checkboxes */}
//             <FormGroup sx={{ mt: 1 }}>
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                     Facilities / Amenities
//                 </Typography>
//                 {amenitiesList.map((amenity) => (
//                     <FormControlLabel
//                         key={amenity}
//                         control={
//                             <Checkbox
//                                 checked={amenities.includes(amenity)}
//                                 onChange={handleAmenity}
//                                 value={amenity}
//                                 sx={{
//                                     color: 'teal',
//                                     '&.Mui-checked': { color: 'teal' },
//                                     p: 0.5,
//                                 }}
//                             />
//                         }
//                         label={<Typography fontSize={15}>{amenity}</Typography>}
//                         sx={{ mb: 0.5 }}
//                     />
//                 ))}
//             </FormGroup>


//             {/* Type to site Checkboxes */}
//             <div className='my-4'>
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                     Spot Type
//                 </Typography>
//             </div>
//             <FormGroup sx={{ mt: 1 }}>
//                 {typeToSiteLists.map((list) => (
//                     <FormControlLabel
//                         key={list}
//                         control={
//                             <Checkbox
//                                 checked={selectedTypes.includes(list)}
//                                 onChange={handleTypeSelection}
//                                 value={list}
//                                 sx={{
//                                     color: 'teal',
//                                     '&.Mui-checked': { color: 'teal' },
//                                     p: 0.5,
//                                 }}
//                             />
//                         }
//                         label={<Typography fontSize={15}>{list}</Typography>}
//                         sx={{ mb: 0.5 }}
//                     />
//                 ))}
//             </FormGroup>



//             {/* Type to RV Checkboxes */}
//             <div className='my-4'>
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                     Compatible RV Types
//                 </Typography>
//             </div>
//             <FormGroup sx={{ mt: 1 }}>
//                 {typeToRV.map((list) => (
//                     <FormControlLabel
//                         key={list}
//                         control={
//                             <Checkbox
//                                 checked={selectedRVTypes.includes(list)}
//                                 onChange={handleRVTypeSelection}
//                                 value={list}
//                                 sx={{
//                                     color: 'teal',
//                                     '&.Mui-checked': { color: 'teal' },
//                                     p: 0.5,
//                                 }}
//                             />
//                         }
//                         label={<Typography fontSize={15}>{list}</Typography>}
//                         sx={{ mb: 0.5 }}
//                     />
//                 ))}
//             </FormGroup>



//             {/* Length Checkboxes */}
//             <div className='my-4'>
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                     Max RV Length
//                 </Typography>
//             </div>
//             <FormGroup sx={{ mt: 1 }}>
//                 {lengthOptions.map((list) => (
//                     <FormControlLabel
//                         key={list}
//                         control={
//                             <Checkbox
//                                 checked={selectedLength.includes(list)}
//                                 onChange={handleLengthSelection}
//                                 value={list}
//                                 sx={{
//                                     color: 'teal',
//                                     '&.Mui-checked': { color: 'teal' },
//                                     p: 0.5,
//                                 }}
//                             />
//                         }
//                         label={<Typography fontSize={15}>{list}</Typography>}
//                         sx={{ mb: 0.5 }}
//                     />
//                 ))}
//             </FormGroup>



//             {/* Number of slides */}
//             <div className='my-4'>
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                     RV Slide-Outs
//                 </Typography>
//             </div>
//             <FormGroup sx={{ mt: 1 }}>
//                 {numberOfSlides.map((list) => (
//                     <FormControlLabel
//                         key={list}
//                         control={
//                             <Checkbox
//                                 checked={selectedSlides.includes(list)}
//                                 onChange={handleSlideSelection}
//                                 value={list}
//                                 sx={{
//                                     color: 'teal',
//                                     '&.Mui-checked': { color: 'teal' },
//                                     p: 0.5,
//                                 }}
//                             />
//                         }
//                         label={<Typography fontSize={15}>{list}</Typography>}
//                         sx={{ mb: 0.5 }}
//                     />
//                 ))}
//             </FormGroup>
//         </Box>
//     );
// };

// export default FilterSidebar;


// components/Traveler/FilterSidebar.jsx

import {
  Box, Typography, Slider, Accordion, AccordionSummary, AccordionDetails,
  Checkbox, FormControlLabel, FormGroup, Button, Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const amenitiesList = ['Water', 'Electricity', 'Sewage Hookups', 'Firepit', 'Wi-Fi'];
const typeToSiteLists = ['Boondocking', 'RV Storage', 'Full Hookups', 'Some Hookups'];
const typeToRV = ['Class A', 'Class B', 'Class C', '5th Wheel', 'Towable'];
const lengthOptions = ['25 ft', '35 ft', '45 ft', '45+ ft'];
const numberOfSlides = ['0 Slide', '1 Slide', '2 Slides','3 Slides', '3+ Slides'];

// optional: parent theke onApply & onClear as props nibo
const FilterSidebar = ({ filters, setFilters, onApply, onClear }) => {
  const handlePrice = (_, newValue) =>
    setFilters((p) => ({ ...p, minPrice: newValue[0], maxPrice: newValue[1] }));

  const handleRating = (value) =>
    setFilters((p) => ({ ...p, minRating: value }));

  const toggleFromArray = (key, value) =>
    setFilters((p) => ({
      ...p,
      [key]: p[key].includes(value) ? p[key].filter((v) => v !== value) : [...p[key], value],
    }));

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>Filters</Typography>

      {/* Price */}
      <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography fontWeight={600}>Price per Night</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Slider
            min={0} max={500} step={10}
            value={[
              filters.minPrice,
              filters.maxPrice ?? 500
            ]}
            onChange={handlePrice}
            valueLabelDisplay="off"
            sx={{ color: 'teal', mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span>${filters.minPrice}</span>
            <span>{filters.maxPrice !== null ? `$${filters.maxPrice}` : '$500'}</span>
          </Box>
        </AccordionDetails>
      </Accordion>

      <hr className='border border-gray-300' />

      {/* Rating */}
      <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography fontWeight={700}>Guest Rating</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Stack direction="row" spacing={1} mb={1}>
            {[0, 1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                variant={filters.minRating === num ? 'contained' : 'outlined'}
                size="small"
                sx={{
                  minWidth: 38, borderRadius: 2, p: 0, fontWeight: 600,
                  backgroundColor: filters.minRating === num ? 'teal' : 'white',
                  color: filters.minRating === num ? 'white' : 'teal',
                  borderColor: 'teal',
                  '&:hover': { backgroundColor: filters.minRating === num ? '#008080' : '#f0f0f0' },
                }}
                onClick={() => handleRating(num)}
              >
                {num}+
              </Button>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Amenities */}
      <FormGroup sx={{ mt: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>Facilities / Amenities</Typography>
        {amenitiesList.map((amenity) => (
          <FormControlLabel
            key={amenity}
            control={
              <Checkbox
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleFromArray('amenities', amenity)}
                sx={{ color: 'teal', '&.Mui-checked': { color: 'teal' }, p: 0.5 }}
              />
            }
            label={<Typography fontSize={15}>{amenity}</Typography>}
            sx={{ mb: 0.5 }}
          />
        ))}
      </FormGroup>

      {/* Spot Type */}
      <div className='my-4'><Typography variant="h6" fontWeight={600} gutterBottom>Spot Type</Typography></div>
      <FormGroup sx={{ mt: 1 }}>
        {typeToSiteLists.map((v) => (
          <FormControlLabel
            key={v}
            control={
              <Checkbox
                checked={filters.site_types.includes(v)}
                onChange={() => toggleFromArray('site_types', v)}
                sx={{ color: 'teal', '&.Mui-checked': { color: 'teal' }, p: 0.5 }}
              />
            }
            label={<Typography fontSize={15}>{v}</Typography>}
            sx={{ mb: 0.5 }}
          />
        ))}
      </FormGroup>

      {/* RV Types */}
      <div className='my-4'><Typography variant="h6" fontWeight={600} gutterBottom>Compatible RV Types</Typography></div>
      <FormGroup sx={{ mt: 1 }}>
        {typeToRV.map((v) => (
          <FormControlLabel
            key={v}
            control={
              <Checkbox
                checked={filters.rv_type.includes(v)}
                onChange={() => toggleFromArray('rv_type', v)}
                sx={{ color: 'teal', '&.Mui-checked': { color: 'teal' }, p: 0.5 }}
              />
            }
            label={<Typography fontSize={15}>{v}</Typography>}
            sx={{ mb: 0.5 }}
          />
        ))}
      </FormGroup>

      {/* Max RV Length */}
      <div className='my-4'><Typography variant="h6" fontWeight={600} gutterBottom>Max RV Length</Typography></div>
      <FormGroup sx={{ mt: 1 }}>
        {lengthOptions.map((v) => (
          <FormControlLabel
            key={v}
            control={
              <Checkbox
                checked={filters.site_length === v}
                onChange={() => setFilters((p) => ({ ...p, site_length: p.site_length === v ? '' : v }))}
                sx={{ color: 'teal', '&.Mui-checked': { color: 'teal' }, p: 0.5 }}
              />
            }
            label={<Typography fontSize={15}>{v}</Typography>}
            sx={{ mb: 0.5 }}
          />
        ))}
      </FormGroup>

      {/* Slide-Outs */}
      <div className='my-4'><Typography variant="h6" fontWeight={600} gutterBottom>RV Slide-Outs</Typography></div>
      <FormGroup sx={{ mt: 1 }}>
        {numberOfSlides.map((v) => (
          <FormControlLabel
            key={v}
            control={
              <Checkbox
                checked={filters.max_slide_label === v}
                onChange={() => setFilters((p) => ({
                  ...p,
                  max_slide_label: p.max_slide_label === v ? '' : v, // UI label store
                }))}
                sx={{ color: 'teal', '&.Mui-checked': { color: 'teal' }, p: 0.5 }}
              />
            }
            label={<Typography fontSize={15}>{v}</Typography>}
            sx={{ mb: 0.5 }}
          />
        ))}
      </FormGroup>

      <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 6 }}>
        <Button size="small" variant="outlined" onClick={onClear}>Clear</Button>
        <Button size="small" variant="contained" sx={{ bgcolor: 'teal' }} onClick={onApply}>Apply</Button>
      </Stack>
    </Box>
  );
};

export default FilterSidebar;
