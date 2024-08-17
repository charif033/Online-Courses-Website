import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useAllCourse } from './fetchAPI';
import courseImage1 from '../Images/remote-1.png';
import courseImage2 from '../Images/remote-2.png';
import courseImage3 from '../Images/remote-3.png';
import courseImage4 from '../Images/remote-4.png';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface activeProps {
    active: string
}
interface courseDataType {
    category: string;
    description: string;
    id: number;
    name: string;
}

const imageArray = [courseImage1, courseImage2, courseImage3, courseImage4];

function CoursesCard({ active }: activeProps) {

    let courseData: courseDataType[] = useAllCourse();
    if (active !== 'all') {
        courseData = courseData.filter(item => item.category === active)
    }

    return (
        <>
            {courseData.map((item) => (
                <Grid item lg={3} md={6} sm={12} xs={12} key={item.id} sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Card component={Link} to={`/course/${item.id}`} sx={{
                        maxWidth: 345, margin: '8px', display: 'flex', flexDirection: 'column', cursor: 'pointer', textDecoration: 'none',
                        ':hover': {
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            transform: 'scale(1.05)',
                            transition: 'all 0.2s ease',
                        },
                        transition: 'all 0.3s ease',
                    }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={imageArray[item.id - 1]}
                            title={item.name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ alignItems: 'flex-bottom' }}>
                            <Typography variant='subtitle2' sx={{ margin: '8px', padding: '2px 8px', border: '1px solid gray', borderRadius: '20px', color: 'gray' }}>{item.category}</Typography>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </>
    )
}

export default CoursesCard