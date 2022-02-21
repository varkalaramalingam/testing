import {io}  from '../components/api/io'

export default{

    createNewProject(data){
        return io({
          method:"POST",
          url:"/projects-api/create",
          data:data 
        })
      }, 

      uploadImage(data){
        return io({
          method:"POST",
          url:"/projects-api/upload",
          data:data
        })
      },

      uploadBannerImage(data){
        return io({
          method:"POST",
          url:"/projects-api/uploadBannerImage",
          data:data
        })
      },

      uploadDoc(data){
        return io({
          method:"POST",
          url:"/projects-api/uploadDoc",
          data:data

        })
      },

      GetProjects(){
        return io({
          method:"GET",
          url:"/projects-api/getAllProjects",
          
        });
      },

      GetSingleProject(id){
        return io({
          method:"GET",
          url:`/projects-api/search/${id}`

        });
      },
      SearchFilters(){
        return io({
          method:"GET",
          url:"/projects-api/search"
        })
        
      }, 
       updateProject(id,updatedData){
         return io({
           method:"PUT",
           url:`/projects-api/update/${id}`,
           data:updatedData

         })

       },

       updateProjectLikes(id,updatedLikes){
         return io({
           method:"PUT",
           url:`/projects-api/updateLikes/${id}`,
           data:updatedLikes
         })
       },

       updateProjectDisLikes(id,updatedDisLikes){
         return io({
           method:"PUT",
           url:`/projects-api/updateDisLikes/${id}`,
           data:updatedDisLikes

         })

       },

       updateProjectComments(id,updatedComment){
         return io({
           method:"PUT",
           url:`/projects-api/updateComment/${id}`,
           data:updatedComment
           
         })

       },

       getComments(id){
         return io({
          method:"GET",
          url:`/projects-api/getComment/${id}`,
         })

       },

       updateStatus(id,status){
         return io({
           method:"PATCH",
           url:`/projects-api/updateStatus?id=${id}&status=${status}`,
         })
       }

}