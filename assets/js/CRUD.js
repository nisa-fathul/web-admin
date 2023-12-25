import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, getDocs, setDoc, addDoc, doc, collection, updateDoc, deleteDoc  } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAtMxRw4dZ2JdvuUZc_PjJSkwD2ksTfag",
    authDomain: "mobile-advertising-f28e7.firebaseapp.com",
    databaseURL: "https://mobile-advertising-f28e7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mobile-advertising-f28e7",
    storageBucket: "mobile-advertising-f28e7.appspot.com",
    messagingSenderId: "19864941021",
    appId: "1:19864941021:web:44daeaf01e7288a2fe0634",
    measurementId: "G-N6EZZXQCVE"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const currentPage = window.location.pathname.split('/').pop();

if (currentPage === 'pesanan.php') {
    // Kode yang akan dijalankan jika halaman adalah "pesanan.php"
    $(document).ready(async function(){
        $("tbody").html("");
        try {
            const querySnapshot = await getDocs(collection(firestore, 'orders'));
            querySnapshot.forEach((doc) => {
                $("tbody").append(`
                    <tr>
                        <th scope="row"><a href="#">${doc.id}</a></th>
                        <td>${doc.data().selectedPaymentOption}</td>
                        <td><a href="#" class="text-primary">${doc.data().jenisBillboard}</a></td>
                        <td>${doc.data().orderPrice}</td>
                        ${
                            doc.data().status === "PENDING"
                                ? `<td>
                                    <div class="col-12">
                                        <button class="btn btn-primary" type="submit" onclick="sData('${doc.id}')">Setujui</button>
                                        <button class="btn btn-secondary" type="submit" onclick="tData('${doc.id}')">Tolak</button>
                                    </div>
                                </td>`
                                : `<td> - </td>`
                        }
                    </tr>
                `);
            });
        } catch (error) {
            console.error("Firestore Read Error:", error);
        }

        window.sData =  async function(id){
            try{
                const docId = id;
                // Melakukan pembaruan dokumen dengan status "disetujui"
                await updateDoc(doc(firestore, 'orders', docId), {
                    status: 'DISETUJUI',
                });
    
                // Menampilkan alert bahwa data berhasil diubah
                alert('Data berhasil diubah');
                location.reload();
            }catch(err){
                console.log(err);
            }
        }

        window.tData =  async function(id){
            try{
                const docId = id;
                // Melakukan pembaruan dokumen dengan status "disetujui"
                await updateDoc(doc(firestore, 'orders', docId), {
                    status: 'DITOLAK',
                });
    
                // Menampilkan alert bahwa data berhasil diubah
                alert('Data berhasil diubah');
                location.reload();
            }catch(err){
                console.log(err);
            }
        }
    });
}

if (currentPage === 'pembayaran.php') {
    $(document).ready(async function(){
    $("tbody").html("");
    try {
        const querySnapshot = await getDocs(collection(firestore, 'payments'));
        querySnapshot.forEach((doc) => {
            $("tbody").append(`
                <tr>
                    <th scope="row"><a href="#">${doc.id}</a></th>
                    <td>${doc.data().selectedPaymentOption}</td>
                    <td>${doc.data().orderPrice}</td>
                    ${
                        doc.data().status === "PENDING"
                            ? `<td>
                                <div class="col-12">
                                    <button class="btn btn-primary" type="submit" onclick="sData('${doc.id}')">Sudah Bayar</button>
                                    <button class="btn btn-secondary" type="reject" onclick="tData('${doc.id}')">Belum Bayar</button>
                                </div>
                            </td>`
                            : `<td>${doc.data().status}</td>`
                    }
                </tr>
            `);
        });
    } catch (error) {
        console.error("Firestore Read Error:", error);
    }
    })

    window.sData =  async function(id){
        try{
            const docId = id;
            // Melakukan pembaruan dokumen dengan status "disetujui"
            await updateDoc(doc(firestore, 'payments', docId), {
                status: 'SUDAH DIBAYAR',
            });

            // Menampilkan alert bahwa data berhasil diubah
            alert('Data berhasil diubah');
            location.reload();
        }catch(err){
            console.log(err);
        }
    }

    window.tData =  async function(id){
        try{
            const docId = id;
            // Melakukan pembaruan dokumen dengan status "disetujui"
            await updateDoc(doc(firestore, 'payments', docId), {
                status: 'PEMBAYARAN GAGAL',
            });

            // Menampilkan alert bahwa data berhasil diubah
            alert('Data berhasil diubah');
            location.reload();
        }catch(err){
            console.log(err);
        }
    }    
}

if (currentPage === 'status_pemesanan.php') {
    $(document).ready(async function(){
    $("tbody").html("");
    try {
        const querySnapshot = await getDocs(collection(firestore, 'orders'));
        querySnapshot.forEach((doc) => {
            $("tbody").append(`
                <tr>
                <th scope="row"><a href="#">${doc.id}</a></th>
                    <td>${doc.data().selectedPaymentOption}</td>
                    <td><a href="#" class="text-primary">${doc.data().jenisBillboard}</a></td>
                    <td>${doc.data().orderPrice}</td>
                    <td>${doc.data().status}</td>
                    ${
                        doc.data().status === "DISETUJUI" || doc.data().status === "ON PROGRESS"
                        ? `<td>
                                <div class="container mt-5">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Pilih Opsi
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li><button type="button" onclick="handleOptionO('${doc.id}')">On Progress</button></li>
                                            <li><button type="button" onclick="handleOptionS('${doc.id}')">Selesai</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </td>`
                        : `<td> - </td>`
                    }
                </tr>
            `);
        });
    } catch (error) {
        console.error("Firestore Read Error:", error);
    }
    })

    window.handleOptionO =  async function(id){
        try{
            const docId = id;
            // Melakukan pembaruan dokumen dengan status "disetujui"
            await updateDoc(doc(firestore, 'orders', docId), {
                status: 'ON PROGRESS',
            });

            // Menampilkan alert bahwa data berhasil diubah
            alert('Data berhasil diubah');
            location.reload();
        }catch(err){
            console.log(err);
        }
    }
    window.handleOptionS =  async function(id){
        try{
            const docId = id;
            // Melakukan pembaruan dokumen dengan status "disetujui"
            await updateDoc(doc(firestore, 'orders', docId), {
                status: 'SELESAI',
            });

            // Menampilkan alert bahwa data berhasil diubah
            alert('Data berhasil diubah');
            location.reload();
        }catch(err){
            console.log(err);
        }
    }
}