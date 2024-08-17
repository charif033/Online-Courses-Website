import axios from "axios";
import { useEffect, useState } from "react";

interface courseDataType {
    category: string;
    description: string;
    id: number;
    name: string;
}

const rootAPI = 'https://13173e93-c476-4c40-a40c-30470f3f679a-00-3h78nwyzk84c.pike.replit.dev'

export function useCourseDetail(id: number): courseDataType | undefined {
    const [data, setData] = useState<courseDataType | undefined>();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${rootAPI}/courses/${id}`);
            setData(result.data);
        };
        fetchData();
    }, []);
    return data;
}

export function useAllCourse(): courseDataType[] {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${rootAPI}/courses`);
            setData(result.data);
        };
        fetchData();
    }, []);
    return data;
}

export function useAllCategories() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${rootAPI}/categories`);
            setData(result.data);
        };
        fetchData();
    }, []);
    return data;
}

export function useCoursesInCategories(categories: string): courseDataType[] {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${rootAPI}/categories/${categories}/courses`);
            setData(result.data);
        };
        fetchData();
    }, []);
    return data;
}

export function moreData() {
    const lessonList = [
        {
            lessonName: 'Lesson 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet assumenda alias ad, provident laudantium illum ea, perspiciatis neque aliquid delectus est. Quia at temporibus assumenda, minus veniam officia corporis?',
            videoPath: 'https://www.youtube.com/watch?v=WIl5F5rM5wQ',
            videoDuration: 470
        },
        {
            lessonName: 'Lesson 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet assumenda alias ad, provident laudantium illum ea, perspiciatis neque aliquid delectus est. Quia at temporibus assumenda, minus veniam officia corporis?',
            videoPath: 'https://www.youtube.com/watch?v=j02hq8993M4',
            videoDuration: 703
        },
        {
            lessonName: 'Lesson 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet assumenda alias ad, provident laudantium illum ea, perspiciatis neque aliquid delectus est. Quia at temporibus assumenda, minus veniam officia corporis?',
            videoPath: 'https://www.youtube.com/watch?v=QBpQHkVmWBw',
            videoDuration: 803
        },
        {
            lessonName: 'Lesson 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet assumenda alias ad, provident laudantium illum ea, perspiciatis neque aliquid delectus est. Quia at temporibus assumenda, minus veniam officia corporis?',
            videoPath: 'https://www.youtube.com/watch?v=qYlyY_hxM7w',
            videoDuration: 240
        },
        {
            lessonName: 'Lesson 5',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet assumenda alias ad, provident laudantium illum ea, perspiciatis neque aliquid delectus est. Quia at temporibus assumenda, minus veniam officia corporis?',
            videoPath: 'https://www.youtube.com/watch?v=vCI2kmFJD_w',
            videoDuration: 1186
        },
    ]
    return lessonList;
}