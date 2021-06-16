using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;


public class PostTest : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("starting");
        // StartCoroutine(ReadCSVFile());
        StartCoroutine(Upload());
    }
    /*
    IEnumerator ReadCSVFile()
    {
        StreamReader strReader = new StreamReader("Assets/pelidata.csv");
        bool endOfFile = false;
        List<GameData> rows = new List<GameData>();
        while(!endOfFile) {
            string data_String = strReader.ReadLine();
            if (data_String == null) {
                endOfFile = true;
                break;
            }
            var data_values = data_String.Split(',');

            GameData obj = new GameData(data_values);

            rows.Add(obj);
            
            for (int x = 0; x < data_values.Length; x++) {
                // Debug.Log("Value: " + x.ToString() + ", " + data_values[x].ToString());

            }
            
            //Debug.Log(data_values[0].ToString() + data_values[1].ToString());
        }
    }
    */
    IEnumerator Upload()
     {
         yield return new WaitForEndOfFrame();
 
         var bytes = System.IO.File.ReadAllBytes("Assets/pelidata.csv");
 
         WWWForm form= new WWWForm();
         form.AddField("modelId", "objectID");
         form.AddField("projectType", "Templates");
         form.AddField("categoryId", "categoryID");
         form.AddBinaryData("file", bytes, "Assets/pelidata.csv", "application/zip");
 
         var uwr = UnityWebRequest.Post("http://localhost:3000/upload", form);
 
         yield return uwr.SendWebRequest();
 
         if (uwr.result == UnityWebRequest.Result.ConnectionError) {
             Debug.LogFormat("Error while uploading file. Stop upload process. \nError code: <color=red>{1}</color>", 
                uwr.downloadHandler.text, uwr.error);
         }
         else
         {
             Debug.Log("upload project done: " + uwr.downloadHandler.text);
         }
 
         uwr.Dispose();
 
     }
}
