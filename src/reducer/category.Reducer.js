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
   }
   return myCategory;
};

// eslint-disable-next-line import/no-anonymous-default-export
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
         // Check if category and category.parentId are defined to avoid TypeError
         if (category && category.parentId !== undefined) {
            // Fixing the argument order in the call to buildNewCategories
            const updatedCategory = buildNewCategories(
               category.parentId, // parentId should be the first argument
               state.categories, // categories should be the second argument
               category // category should be the third argument
            );
            console.log(updatedCategory);
            state = {
               ...state,
               categories: updatedCategory,
               loading: false,
            };
         }
         break;
      case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
         state = {
            ...initState,
         };
         break;
      default:
         break; // Added default case to handle unspecified actions
   }
   return state;
};
