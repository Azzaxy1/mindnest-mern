import store from "./redux/store";
import { updatedName } from "./redux/reducers/globalSlice";
import { updatedDataBlog, updatedPage } from "./redux/reducers/homeSlice";
import { setUpdatedForm } from "./redux/reducers/createBlogSlice";

export { store, updatedDataBlog, updatedName, updatedPage, setUpdatedForm };
