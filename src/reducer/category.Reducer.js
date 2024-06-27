import { categoryConstants } from "../actions/constant.Action";

const initState = {
   categories: [],
   loading: false,
   error: null,
};

const buildNewCategories = (parentId, categories, category) => {
   let myCategory = [];

   if (parentId === undefined) {
      return [
         ...categories,
         {
            id: category._id,
            slug: category.slug,
            name: category.name,
            children: [],
         },
      ];
   }

   for (let cat of categories) {
      if (cat._id === parentId) {
         myCategory.push({
            ...cat,
            children: cat.children
               ? buildNewCategories(
                    parentId,
                    [
                       ...cat.children,
                       {
                          _id: category._id,
                          slug: category.slug,
                          name: category.name,
                          parentId: category.parentId,
                          children: category.children,
                       },
                    ],
                    category
                 )
               : [],
         });
      } else {
         myCategory.push({
            ...cat,
            children: cat.children
               ? buildNewCategories(parentId, cat.children, category)
               : [],
         });
      }

      return myCategory;
   }
};

export default (state = initState, action) => {
   switch (action.type) {
      case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
         state = {
            ...state,
            categories: action.payload.categories,
         };
         break;
      case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
         state = {
            ...state,
            loading: true,
         };
         break;
      case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
         const category = action.payload.category;
         const updatedCategory = buildNewCategories(
            state.categories,
            category,
            category.parentId
         );
         console.log(updatedCategory);
         state = {
            ...state,
            categories: updatedCategory,
            loading: false,
         };
         break;
      case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
         state = {
            ...initState,
         };
   }
   return state;
};
