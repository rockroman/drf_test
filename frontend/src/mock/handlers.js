import {rest} from "msw"
const baseURL = "https://dj-rest-test-f6d48f5f2d48.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 14,
        username: "Tara",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 14,
        profile_image:
          "https://res.cloudinary.com/di0onpbp0/image/upload/v1/media/images/default_profile_gwcpmq",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/user/`,(req,res,ctx)=>{
    return res(ctx.status(200));
  })
];
