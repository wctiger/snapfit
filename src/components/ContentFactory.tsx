import { useRecoilValue } from 'recoil';
import Collate from '../features/collate/Collate';
import Crop from '../features/crop/Crop';
import Preview from '../features/preview/Preview';
import Upload from '../features/upload/Upload';
import { uploadImageStore } from '../stores';
import Layout from './layout';

const ContentFactory = () => {
    const uploadImage = useRecoilValue(uploadImageStore);
    const getLeftComp = () => {
        if (uploadImage) {
            return <Crop />;
        }
        return <Upload />;
    };
    const getRightComp = () => {
        if (uploadImage) {
            return <Collate />;
        }
        return <Preview />;
    };
    return <Layout leftComp={getLeftComp()} rightComp={getRightComp()} />;
};

export default ContentFactory;
