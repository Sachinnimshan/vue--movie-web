<template>
    <v-container>
      <v-row no-gutters>
        <v-col sm='10' class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Update Post</v-card-title>
            <v-card-devider></v-card-devider>
            <v-form ref="form" class="pa-5" @submit.prevent="updateForm" enctype='multipart/form-data'>
            <v-text-field label='Title' v-model="post.Title" prepend-icon='mdi-note'></v-text-field>
            <v-text-field label='Category' v-model="post.Category" prepend-icon='mdi-view-list'></v-text-field>
            <v-text-field label='Description' v-model="post.Description" prepend-icon="mdi-note-plus"></v-text-field>
            <v-file-input @change="onFileChange"  show-size counter multiple label='Select Image'></v-file-input>
            <v-img :src="`/${post.Image}`" width='120'></v-img>
            <v-btn type='submit' class="mt-3" color="success">Update</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
</template>

<script>
import API from '../api';
  export default {
    name: 'EditPost',
    data(){
      return {
        rules: [(value)=> !!value || "This Field is Required"],
        post:{
          Title:"",
          Category:"",
          Description:"",
          Image:""
        },
        Image:""
      }
    },
    async created(){
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
    },
    methods:{
    onFileChange(file){
    this.Image = file[0];
      },
      async updateForm(){
        const formData = new FormData();
        formData.append("Image", this.Image);
        formData.append("Title", this.post.Title);
        formData.append("Category", this.post.Category);
        formData.append("Description", this.post.Description);
        formData.append("old_image", this.post.Image);
        if(this.$refs.form.validate()){
          const response = await API.updatePost(this.$route.params.id, formData);
          this.$router.push({name: 'home', params: {message: response.message}});
        }
        
      }
    }
  }
</script>
