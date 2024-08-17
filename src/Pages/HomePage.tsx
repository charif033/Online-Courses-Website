import { Box, Button, Container, Grid, Typography } from "@mui/material"
import headSectionBackground from '../Images/workspace-1280538_1920.jpg'
import colorset from "../Components/colorset"
import logo from '../Images/Logo/CodeBook-logo-t-w.png'
import CategoriesButton from "../Components/CategoriesButton"
import { useRef, useState } from "react"
import CoursesCard from "../Components/CoursesCard"


function HomePage() {
    const [active, setActive] = useState('all');
    const courseRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        courseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <Box sx={{
                height: '800px',
                width: 'auto',
                backgroundImage: `url(${headSectionBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Container maxWidth="lg">
                    <img src={logo} alt="" style={{ width: '100%', maxWidth: '400px', filter: 'drop-shadow(0 0 12px black)' }} />
                    <Box sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        width: '100%',
                        maxWidth: '680px',
                        padding: '28px',
                        margin: '28px 0',
                        borderRadius: '15px',
                        boxSizing: 'border-box'
                    }}>
                        <Typography variant="h3" sx={{ color: colorset.yellow, paddingBottom: '25px', fontWeight: 'bold' }}>
                            LET'S LEARN CODE WITH US
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: colorset.light }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates nobis quaerat, inventore, cum magnam eum perferendis eius sit voluptate aut omnis, consectetur nulla est impedit officia recusandae quae reprehenderit! Quos?
                        </Typography>
                    </Box>
                    <Button color="inherit" variant="contained" onClick={handleClick} sx={{ color: colorset.dark, fontWeight: 'bold' }}>Get Start</Button>
                </Container>
            </Box >
            <Container maxWidth="lg" ref={courseRef} >
                <Typography variant="h4" sx={{ color: colorset.dark, textAlign: 'center', fontWeight: 'bold', margin: '50px' }}>
                    COURSES <hr />
                </Typography>
                <Box sx={{ margin: '50px' }}>
                    <CategoriesButton active={active} setActive={setActive}></CategoriesButton>
                    <Grid container>
                        <CoursesCard active={active}></CoursesCard>
                    </Grid>

                </Box>

            </Container>
        </>
    )
}

export default HomePage