import React, { useEffect } from 'react'
import { db } from '../firebase';
import {ref, child, get, set, update} from 'firebase/database';
import { getYMD } from '../helpers'; 


function randomPosition() {
    let positions = ["Backend Engineer", "DevOps Engineer", "Frontend Engineer", "Operating Assitant", "Intern", "Web Designer", "Marketing Coordinator", "Project Manager", "Human Resources Manager", "Accountant", "Sales", "Quantum Analyst"];
    let index = Math.round(Math.random() * (positions.length - 1));
    return positions[index];
}

function randomPicture(gender) {
    let pictures = {
        male: [
            'https://www.byrdie.com/thmb/Axx3ZdrPMB6QfFNLVXWF9oPGe0g=/800x800/smart/filters:no_upscale()/faceshapepromo-13c68f5af8dc412dad199b12402da165.jpg',
            'https://images.theconversation.com/files/90015/original/image-20150729-30889-ri221u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
            'https://www.faceapp.com/static/img/content/compare/beard-example-before@3x.jpg',
            'https://images.thefacecdn.com/images/CLIVE_THEFACE_1.jpg?fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&w=375&h=267.85714285714',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL17fZHkmmrXz8BupXTxnnoJxstS7d4VDoZQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67VRyYMw5x8ignJSPN0d0Dme98CF8HyOd57jZA0nrLrr3FyM3lqabk9OWnHVsbUkJGBE&usqp=CAU',
            'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/948385e6260747618f07ac56017abfeb_9366/Face_Covers_3-Pack_M-L_Multicolor_HB7854_21_model.jpg',
            'https://i.shgcdn.com/71fa9399-31ab-4bd0-a055-235e3ca625dc/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaXrFMnQrS3cdGFTB-UpG-5qMGMQyybPu7xg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSISqltd9EaCd7R7zw0mRiQy3xc7DV-luVOBEj98MGYLug-EKmnooyC0OFP8DrBh5XLtBo&usqp=CAU',
            'https://www.aljazeera.com/wp-content/uploads/2021/06/AP_21152729552748.jpg?resize=770%2C513',
            'https://previews.123rf.com/images/warrengoldswain/warrengoldswain1107/warrengoldswain110700253/9967753-young-man-face-a-high-detailed-portrait.jpg',
            'https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg',
            'https://www.wallpaperflare.com/static/0/180/839/model-portrait-colton-haynes-man-wallpaper.jpg',
            'https://cdn.picpng.com/faces/man-face-transparent-32747.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYijt7wsiqCMzExlfV2Eeib8BfYVGL3AjPA&usqp=CAU'
        ],
        female: [
            'https://i.pinimg.com/474x/ca/06/a3/ca06a31bb0cf2d0fbfeddb0c592f8506--girl-face-woman-face.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6StiHq-eX8mSvmIFOmkE-WNSTavPJQIgHQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOZxtxuvAgUAC-omdgVrlNivK2fItCWxnZA&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVHqucMCo1VYFkxKI12a8a3lURlwUPmIyuAQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFocsVwxGCNHOsIgHj_f0-_DfGjpqLjRIKyRjuJ4OBL3I-qdV-UC71CUE6vI8PT3Hv0U&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxyfiI0BpkaG81Y86mU9UiSpSLpYVz89u2EC2UhjPvtU_EEqz6mfFB9xbjDKMnKy8cnM&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP4aUprW8wLVix_RWeTcwWqQUdYPz7yl57BdrMJz-YU1nE8pvl8wxpakJkkaPQaBx2n64&usqp=CAU',
            'https://i.guim.co.uk/img/media/0e622be011c6795a9c5fd869fa61db1fd0e4802d/1258_4_3554_2133/master/3554.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d2ae81d43169b6992b4f5c282ec770c2',
            'https://assets.vogue.com/photos/606fdd82a2b7c03119469b39/4:3/w_656,h_492,c_limit/Screen%20Shot%202021-04-09%20at%2012.47.01%20AM%20(1).png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XI7qfnmmtKi0hjmTNIoST8r_9-57gbekbQ&usqp=CAU',
            'https://www.makeupforever.com/on/demandware.static/-/Sites-MakeUpForEver-KR-Library/default/dw38ff3766/images/Homepage/Face2.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpnjp1duccUKQQUAPsOy4VgMPdENUawLP8-g&usqp=CAU',
            'https://www.faceapp.com/static/img/content/compare/retouch-example-before@3x.jpg',
            'https://www.drkandhariclinic.com/know-your-face/img/face-img.jpg',
            'https://i.shgcdn.com/c37924fe-be73-431d-ab9a-77956248f3b7/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
            'https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2021/02/08/8af1e003-a184-4d28-8de8-619df0c404a2_3418b70d.jpg?itok=aROG35De&v=1612755550',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Gg59I3SzhN-qjgKZ3DIV5w-C-DfapCziX6qI2qbabOlGJ12I4l7Mz-3xkjCACuhheYk&usqp=CAU'
        ]
    }
    let which = pictures[gender];
    let index = Math.round(Math.random() * (which.length - 1));
    return which[index];
}

function randomName(gender) {
    let names = {
        male: [
           'Aidyn Aluadin',
           'Asmir Abdimazhit',
           'Arsen Adilkhan',
           'Liam Smith',
           'Noah Doe',
           'Donald Trump',
           'Lionel Messi',
           'Cristiano Ronaldo',
           'James Bond',
           'William Wittingen',
           'Benjamin Franklin',
           'Daniel Eizenbaum',
           'Mason Momoa',
           'Ethan Daniel',
           'Michael Jackson' 
        ],
        female: [
            'Olivia Brown',
            'Ava Smith',
            'Emma Watson',
            'Harley Quinn',
            'Mia David',
            'Misty Kim',
            'Taylor Pak',
            'Hyesoo Lee',
            'Charlotte Whittington',
            'Jenny Yeung',
            'Louise Downie',
            'Lisa Simpson',
            'Maria Andreeva'
        ]
    }
    let which = names[gender];
    let index = Math.round(Math.random() * (which.length - 1));
    return which[index];
}

function generateTime() { // Generates random time between 08:00 - 10:00
    let startHour = 6; // 0-23
    let endHour = 10; // 0-23
    let hour = Math.max(8, startHour + Math.random() * (endHour - startHour) | 0);
    let minutes = 0 + Math.random() * 59 | 0;
    let hh = hour.toString();
    if(hh.length < 2) hh = '0' + hh;
    let mm = minutes.toString();
    if(mm.length < 2) mm = '0' + mm;
    return `${hh}:${mm}`;
}


function generateMood() {
    let moods = ["happy", "neutral", "angry", "sad", "worried"];
    let index = Math.round(Math.random() * (moods.length - 1));
    return moods[index];
}

function generateTemperature() {
    let normal = 36.6;
    let diff = Math.random() * 2;
    if(Math.random() <= 0.5) {
        return normal - diff;
    } else {
        return normal + diff
    }
}

export default function GenerateRandomAttendanceData() {
    
    useEffect(() => {
        console.log('Starting!');

        let finishDate = new Date();
        let startDate = new Date();
        startDate.setMonth(finishDate.getMonth() - 2);
        startDate.setDate(1);
        const dbRef = ref(db);

        get(child(dbRef, 'workers')).then((snapshot) => {
            console.log('response');
            if(snapshot.exists()) {
                let workers = snapshot.val();
                for(let workerKey in workers) {
                    let worker = workers[workerKey];
                    console.log(workerKey, worker);
                    
                    let attendance = {}
                    /* 
                    {
                        "01-01-2022": {
                            time: "08:00",
                            picture: "url",
                            mood: "fdsf",
                            temperature: 36.6,
                            reason: "",
                            reasonFile: "",
                            reasonStatus: "",
                            managerResponse: "" 
                        }
                    };
                    */ 
                    
                    for(let d = new Date(startDate.getTime()); d <= finishDate; d.setDate(d.getDate() + 1)) {
                        let key = getYMD(d);
                        let miss = (Math.random() <= 0.03);
                        // console.log(key, miss);
                        
                        if(!miss) {
                            attendance[key] = {
                                time: generateTime(),
                                picture: null, // url to the bucket
                                mood: generateMood(),
                                temperature: generateTemperature(),    
                            }
                        }
                    }

                    console.log(attendance);

                    let gender = Math.random() * 2;
                    if(gender <= 1) gender = "male";
                    else gender = "female";
                    if(worker.role !== "manager") {
                        set(ref(db, `workers/${workerKey}/attendance`), attendance);

                        // update(ref(db, `workers/${workerKey}/`), {
                        //     attendance: attendance,
                        //     role: "worker",
                        //     position: randomPosition(),
                        //     photo: randomPicture(gender),
                        //     name: randomName(gender)
                        // });
                    }
                }
            } else {
                console.log("No data available");
            }
        });

    }, []);

    return (
        <div>
            Firebase updated!
        </div>
    )
}
