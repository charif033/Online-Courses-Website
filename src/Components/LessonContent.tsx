import { Box, Typography } from '@mui/material';
import image from '../Images/desk-593327_1920.jpg'
import colorset from './colorset';
import ReactPlayer from 'react-player';
import { useEffect } from 'react';

interface activeLessonType {
    activeLesson: string
    lessonData: {
        lessonName: string;
        description: string;
        videoPath: string
        videoDuration: number;
    }[]
    courseData: {
        category: string;
        description: string;
        id: number;
        name: string;
    }
    isLogin: boolean
    completed: {
        courseName: string
        lessonCompleted: [string]
    }[]
    setCompleted: React.Dispatch<any>
}

function LessonContent({ activeLesson, lessonData, courseData, isLogin, completed, setCompleted }: activeLessonType) {
    const thisLesson = lessonData.find(Object => Object.lessonName === activeLesson);

    function completedLesson() {
        if (completed.length === 0) {
            const newCompleted = [{
                courseName: courseData.name,
                lessonCompleted: [thisLesson?.lessonName]
            }];
            setCompleted(newCompleted);
        } else {
            const index = completed.findIndex(Object => Object.courseName === courseData.name)
            const newCompleted = [...completed]
            if (index === -1) {
                newCompleted.push({
                    courseName: courseData.name,
                    lessonCompleted: [thisLesson.lessonName]
                });
            } else {
                newCompleted[index].lessonCompleted.push(thisLesson.lessonName);
            }
            setCompleted(newCompleted)
        }
    }
    console.log(completed)
    useEffect(() => {
        if (completed.length > 0) {
            localStorage.setItem('completed', JSON.stringify(completed));
        }
    }, [completed]);
    console.log(localStorage)

    if (activeLesson === 'main') {
        return (
            <>
                <img src={image} width={'100%'} style={{ borderRadius: '15px' }} />
                <Box sx={{ padding: '18px' }}>
                    <Typography variant='h5' fontWeight={'bold'} sx={{ display: 'inline-block', backgroundColor: colorset.yellow, color: colorset.dark }}>
                        {courseData.name}
                    </Typography>
                    <Typography sx={{ marginTop: '18px' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam necessitatibus sunt doloremque? Quae sapiente voluptate, dolorem perspiciatis soluta, eius blanditiis laborum a deleniti repellat quo provident, facilis distinctio vero excepturi.
                    </Typography>
                </Box>
            </>
        )
    } else {
        if (isLogin) {
            return (
                <>
                    <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '15px', overflow: 'hidden' }}>
                        <ReactPlayer
                            url={thisLesson?.videoPath}
                            width="100%"
                            height="100%"
                            controls
                            playing
                            muted
                            style={{ position: 'absolute', top: 0, left: 0, borderRadius: '15px' }}
                            onEnded={completedLesson}
                        />
                    </div>
                    <Box sx={{ padding: '18px' }}>
                        <Typography variant='h6' fontWeight={'bold'} sx={{}}>
                            {courseData.name}
                        </Typography>
                        <Typography variant='h5' fontWeight={'bold'} sx={{ display: 'inline-block', backgroundColor: colorset.yellow, color: colorset.dark }}>
                            {thisLesson?.lessonName}
                        </Typography>
                        <Typography sx={{ marginTop: '18px' }}>
                            {thisLesson?.description}
                        </Typography>
                    </Box>

                </>
            )
        } else {
            return (
                <>
                    <Typography variant='h5' sx={{
                        textAlign: 'center',
                        height: '630px',
                        alignContent: 'center',
                        borderRadius: '15px',
                        backgroundColor: colorset.light,
                        color: colorset.dark
                    }}>
                        Please Login
                    </Typography>
                </>
            )
        }

    }

}

export default LessonContent