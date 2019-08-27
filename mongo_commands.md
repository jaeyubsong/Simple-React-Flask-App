# Simple-React-Flask-App

One paragraph description to go

### Make database files
- make id for each document in the form "videoNumber_startFrame"
```
db.scene_text.aggregate( [
    {
        $addFields: {
            _id: {
                $concat: [
                    { $toString: "$video" }, 
                    "_",
                    { $toString: "$startFrame" }
                ]
            }
        }
    },
    {   $out: "scene_text_id"   }
])
```

- Combine the documents
```
db.allFrames_id.explain("executionStats").aggregate([
    // Join with mmdetection table
    {
        $lookup:{
            from: "mmdetection_id",
            localField: "_id",
            foreignField: "_id",
            as: "my_mmdetection"
        }
    },
    {
        $lookup:{
            from: "scene_text_id",
            localField: "_id",
            foreignField: "_id",
            as: "my_scene_text"
        }
    },
    {
        $lookup:{
            from: "color_id",
            localField: "_id",
            foreignField: "_id",
            as: "my_color"
        }
    },
    {
        $project:{
            _id: 1,
            video: 1,
            keyFrame: 1,
            startFrame: 1,
            endFrame: 1,
            startSecond: 1,
            endSecond: 1,
            object: {
                $reduce: {
                    input: "$my_mmdetection.object",
                    initialValue: [],
                    in: {$concatArrays: ['$$value', '$$this']}
                }
            },
            text: {
                $reduce: {
                    input: "$my_scene_text.text",
                    initialValue: [],
                    in: {$concatArrays: ['$$value', '$$this']}
                }
            },
            color: {
                $reduce: {
                    input: "$my_color.color",
                    initialValue: [],
                    in: {$concatArrays: ['$$value', '$$this']}
                }
            }
        }
    },
    {   $out: "allFrames_combined"   }
])
```


### Useful commands
- access mongoDB with shell
```
$ docker exec -it simpleflaskapp_mongo_1 mongo
```

- Export mongodb data
```
$ mongodump --db database_name --collection collection_name
```
- Copy file from container to host
```
docker cp <container id>:/source/file/path/in/container /destination/on/host
```
  
- Import mongodb data
```
$ mongorestore --db database_name path_to_bson_file
```
