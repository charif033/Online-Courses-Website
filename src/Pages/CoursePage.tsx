import { Box, Container, Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useCourseDetail, moreData } from '../Components/fetchAPI';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from 'react';
import LessonContent from '../Components/LessonContent';
import colorset from '../Components/colorset';
import DoneIcon from '@mui/icons-material/Done';

interface courseDataType {
    category: string;
    description: string;
    id: number;
    name: string;
}

interface isLoginType {
    isLogin: boolean
}

interface completedType {
    courseName: string
    lessonCompleted: [string]
}

interface completefProp {
    lessonName: string
    isLogin: boolean
}

function CoursePage({ isLogin }: isLoginType) {
    const { id } = useParams();
    const courseData: courseDataType | undefined = useCourseDetail(Number(id));
    const lessonData = moreData();
    const [activeLesson, setActiveLesson] = useState('main')
    const [completed, setCompleted] = useState<completedType[]>(() => {
        const storedCompleted = localStorage.getItem('completed');
        return storedCompleted ? JSON.parse(storedCompleted) : [];
    })

    let duration = 0;
    lessonData.map((item) => {
        duration += item.videoDuration;
    })

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    function CompletedBadge({ lessonName, isLogin }: completefProp) {
        const completedObj = completed.find(Object => Object.courseName === courseData?.name)
        const index = completedObj?.lessonCompleted.findIndex(lesson => lesson === lessonName) ?? -1
        console.log('index:', index)
        if (index >= 0 && isLogin) {
            return (
                <>
                    <Typography variant='subtitle2' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px 2px',
                        borderRadius: '20px',
                        color: 'white',
                        backgroundColor: 'green'
                    }}>
                        <DoneIcon fontSize='small' />
                    </Typography >
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

    if (!courseData) {
        return <div>No course data available</div>;
    }
    return (
        <>
            <Container maxWidth='lg' sx={{ margin: '25px auto' }}>
                <Grid container >
                    <Grid item md={8} xs={12} >
                        <Box sx={{
                            margin: '15px',
                            borderRadius: '15px',
                            boxSizing: 'border-box',
                            backgroundColor: '#6e6b60',
                            color: colorset.light

                        }}>
                            <LessonContent activeLesson={activeLesson} lessonData={lessonData} courseData={courseData} isLogin={isLogin} completed={completed} setCompleted={setCompleted} ></LessonContent>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12} >
                        <Box onClick={() => setActiveLesson('main')} sx={{
                            margin: '15px',
                            padding: '18px',
                            borderRadius: '15px',
                            backgroundColor: colorset.dark,
                            cursor: 'pointer',
                            ':hover': {
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                transform: 'scale(1.02)',
                                transition: 'all 0.2s ease'
                            },
                            transition: 'all 0.3s ease',
                        }}>
                            <Typography variant='h4' sx={{ fontWeight: 'bold', margin: '18px auto', color: colorset.yellow }}>
                                {courseData.name.toUpperCase()}
                            </Typography>
                            <Typography sx={{ margin: '18px auto', color: colorset.light }}>
                                {courseData.description}
                            </Typography>
                            <Typography variant='subtitle2' sx={{ display: 'inline-block', margin: '8px', padding: '2px 8px', border: '1px solid gray', borderRadius: '20px', color: 'gray' }}>
                                {courseData.category}
                            </Typography>
                        </Box>
                        <Box sx={{
                            margin: '15px',
                            padding: '0',
                            borderRadius: '15px',
                            backgroundColor: '#6e6b60',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '26px 18px',
                                backgroundColor: colorset.dark,
                                color: colorset.light
                            }}>
                                <Typography variant='h6' fontWeight={'bold'}>
                                    Leason in this class
                                </Typography>
                                <Typography variant='h6'>
                                    {formatTime(duration)}
                                </Typography>
                            </Box>
                            <Box sx={{ margin: '0' }}>
                                {lessonData.map((item) => (
                                    <Box key={item.lessonName} onClick={() => setActiveLesson(item.lessonName)} sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '18px',
                                        cursor: 'pointer',
                                        ':hover': {
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            transform: 'scale(1.02)',
                                            transition: 'all 0.2s ease'
                                        },
                                        transition: 'all 0.3s ease',
                                    }}>
                                        <Typography variant='body1' fontWeight={'bold'} sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            color: activeLesson === item.lessonName ? colorset.yellow : colorset.light
                                        }}>
                                            <PlayCircleOutlineIcon />
                                            {item.lessonName}
                                            <CompletedBadge lessonName={item.lessonName} isLogin={isLogin}></CompletedBadge>
                                        </Typography>
                                        <Typography sx={{ color: activeLesson === item.lessonName ? colorset.yellow : colorset.light }}>
                                            {formatTime(item.videoDuration)}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default CoursePage