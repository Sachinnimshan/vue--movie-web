<template>
    <v-container>
      
      <v-row no-gutters>
        <v-col sm='10' class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Add New Post</v-card-title>
            <v-card-devider></v-card-devider>
            <v-form ref="form" class="pa-5" @submit.prevent="submitForm" enctype='multipart/form-data'>
            <v-text-field label='Title' v-model="post.Title" prepend-icon='mdi-note' :rules='rules'></v-text-field>
            <v-text-field label='Category' v-model="post.Category" prepend-icon='mdi-view-list' :rules='rules'></v-text-field>
            <v-textarea label='Description' v-model="post.Description" prepend-icon="mdi-note-plus" :rules='rules'></v-textarea>
            <v-file-input @change="onFileChange" :rules='rules' show-size counter multiple label='Select Image'></v-file-input>
            <v-btn type='submit' class="mt-3" color="primary">Add Post</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
</template>

<script>
import API from '../api';
  export default {
    name: 'AddPost',
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
    methods:{
    onFileChange(file){
    this.Image = file[0];
      },
      async submitForm(){
        const formData = new FormData();
        formData.append("Image", this.Image);
        formData.append("Title", this.post.Title);
        formData.append("Category", this.post.Category);
        formData.append("Description", this.post.Description);
        if(this.$refs.form.validate()){
          const response = await API.addnewPost(formData);
          this.$router.push({name: 'home', params: {message: response.message}});
        }
        
      }
    }
  }
</script>
