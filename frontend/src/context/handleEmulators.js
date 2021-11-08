export function handleEmulators(_db){
    if (window.location.hostname === "localhost") {
        console.log("localhost detected! Using functions and firestore emulators instead of live instances");
        _db.settings({ 
          host: "localhost:8080",
          ssl: false
        });
    }
}