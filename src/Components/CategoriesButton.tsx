import { Box, Button } from "@mui/material";
import { useAllCategories } from "./fetchAPI";

interface activeProps {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
}

function CategoriesButton({ active, setActive }: activeProps) {
    const categories = useAllCategories();

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', margin: '50px' }} >
                <Button color="inherit" onClick={() => setActive('all')} variant={active === 'all' ? 'contained' : 'outlined'}>
                    All
                </Button>
                {categories.map((item) => (
                    <Button key={item} color="inherit" onClick={() => setActive(item)} variant={active === item ? 'contained' : 'outlined'}>
                        {item}
                    </Button>
                ))}
            </Box >

        </>
    );
};

export default CategoriesButton;