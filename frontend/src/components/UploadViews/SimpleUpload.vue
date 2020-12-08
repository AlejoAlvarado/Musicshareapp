<!-- The basic part of the component to Upload. Has the options to open folder of the user computer and
to select the file. Should be a mp3 file. -->
<template>
  <div>
      <v-row no-gutters justify="center" align="center">
        <!-- This col is just the input for the file -->
        <v-col cols="8">
          <v-file-input
            show-size
            label="Click to choose mp3 file"
            @change="selectFile"
            dark
          ></v-file-input>
        </v-col>

        <!-- This col has the Button to upload the file selected to the server -->
        <v-col cols="4" class="pl-2">
          <v-btn color="blue" dark small @click="uploadBatch">
            Upload
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-alert v-if="message" border="left" color="blue-grey" dark>
        {{ message }}
      </v-alert>

      <v-card v-if="fileInfos.length > 0" class="mx-auto">
        <v-list>
          <v-subheader>List of Files</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="(fileInfo, index) in fileInfos" :key="index">
              {{ fileInfo.file.name }}
              <v-progress-linear
                :v-model="fileInfo.progress"
                color="light-blue"
                height="25"
                reactive
              >
                <strong>{{ fileInfo.progress }} %</strong>
              </v-progress-linear>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
        >
          {{message}}
      </v-snackbar>
  </div>
</template>

<script>
import axios from "../../config/axios";

export default {
    data(){
        return{
            message:"",
            fileInfos:[],
            snackbar:false,
            timeout:2000
        }
    },
    methods:{
        selectFile(file){
            if(file.name.split(".")[file.name.split(".").length-1]!=="mp3"){
                this.message = "It can only be an mp3 file!";
                this.snackbar=true;
                console.log("It can only be an mp3 file!")
                return;
            }
            this.fileInfos.push({
              file:file,
              progress:0
            })
        },
        uploadBatch(){
          let i=0;
          for(i=0;i<this.fileInfos.length;i++){
            this.upload(this.fileInfos[i]);
          }
        },
        upload(fileInfo){
            let currentFile=fileInfo.file;
            this.message="";
            this.sendFile(currentFile,(event)=>{
                fileInfo.progress = Math.round((100*event.loaded)/event.total);
            }).then((res)=>{
                this.message=res.data.message;
                this.$store.commit("addSongToMusicPlaylist",res.data.songData);
            }).catch((err)=>{
                console.log(err)
                fileInfo.progress = 0;
                this.message = "Could not upload the file!";
                this.snackbar = true;
            })
        },
        sendFile(file, onUploadProgress){
            let formData = new FormData();
            formData.append('file',file);
            return axios.post('/users/user-song?id='+this.$store.state.user._id,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                onUploadProgress
            });
        }
    }
}
</script>

<style>

</style>