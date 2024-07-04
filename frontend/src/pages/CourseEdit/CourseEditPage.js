import { useParams } from 'react-router-dom';
import classes from './courseEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/courseService'; // Assuming these are the correct service methods
import Title from '../../components/Title/Title';
import InputContainer from '../../components/InputContainer/InputContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { uploadImage } from '../../services/uploadService'; // Service for handling image uploads
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CourseEditPage() {
    const { courseId } = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const isEditMode = !!courseId;

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (!isEditMode) return;

        getById(courseId).then(course => {
            if (!course) return;
            reset(course);
            setImageUrl(course.imageUrl);
        });
    }, [courseId, reset, isEditMode]);

    const submit = async courseData => {
        const course = { ...courseData, imageUrl };

        try {
            if (isEditMode) {
                await update(course);
                toast.success(`Course "${course.title}" updated successfully!`);
            } else {
                const newCourse = await add(course);
                toast.success(`Course "${course.title}" added successfully!`);
                navigate('/admin/editCourse/' + newCourse.id, { replace: true });
            }
        } catch (error) {
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} course. Please try again.`);
        }
    };

    const upload = async event => {
        setImageUrl(null);
        const uploadedUrl = await uploadImage(event);
        setImageUrl(uploadedUrl);
    };

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={isEditMode ? 'Edit Course' : 'Add Course'} />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <InputContainer label="Select Thumbnail">
                        <input type="file" onChange={upload} accept="image/jpeg, image/png" />
                    </InputContainer>

                    {imageUrl && (
                        <a href={imageUrl} className={classes.image_link} target="_blank" rel="noopener noreferrer">
                            <img src={imageUrl} alt="Uploaded Thumbnail" />
                        </a>
                    )}

                    <Input
                        type="text"
                        label="Title"
                        {...register('title', { required: true, minLength: 5 })}
                        error={errors.title}
                    />

                    <Input
                        type="text"
                        label="Category"
                        {...register('category', { required: true })}
                        error={errors.category}
                    />

                    <Input
                        type="number"
                        label="Duration (hours)"
                        {...register('duration', { required: true })}
                        error={errors.duration}
                    />

                    <Input
                        type="text"
                        label="Description"
                        {...register('description', { required: true, minLength: 10 })}
                        error={errors.description}
                    />

                    <Input
                        type="text"
                        label="Modules (comma-separated)"
                        {...register('modules')}
                        error={errors.modules}
                    />

                    <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
                </form>
            </div>
        </div>
    );
}
