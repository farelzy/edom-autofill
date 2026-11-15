(() => {
    const form = document.querySelector('#form1');

    if (!form) {
        console.error('Form #form1 tidak ditemukan!');
        return;
    }

    // 1. Pilih semua jawaban PUAS
    let berhasil = 0;

    form.querySelectorAll('li').forEach(li => {
        const label = li.querySelector('.answerlist1');
        const radio = li.querySelector(
            '.answerlist2 input.opt[type="radio"]'
        );

        if (
            label &&
            radio &&
            label.textContent.trim().toLowerCase() === 'puas'
        ) {
            radio.click();

            if (radio.checked) berhasil++;
        }
    });

    console.log('Jawaban Puas:', berhasil);

    // 2. Cari kolom saran nomor 7
    const pertanyaan = [...form.querySelectorAll('.tb')]
        .find(el =>
            /Masukan\s*\/\s*saran untuk dosen/i.test(el.textContent)
        );

    let fieldSaran = null;

    if (pertanyaan) {
        // Cari dalam container induk secara bertahap
        let parent = pertanyaan.parentElement;

        while (parent && parent !== form && !fieldSaran) {
            fieldSaran = parent.querySelector(
                'textarea, input[type="text"]'
            );
            if (!fieldSaran) parent = parent.parentElement;
        }
    }

    // 3. Isi NULL
    if (fieldSaran) {
        const setter = Object.getOwnPropertyDescriptor(
            Object.getPrototypeOf(fieldSaran),
            'value'
        )?.set;

        if (setter) {
            setter.call(fieldSaran, 'NULL');
        } else {
            fieldSaran.value = 'NULL';
        }

        fieldSaran.dispatchEvent(
            new Event('input', { bubbles: true })
        );
        fieldSaran.dispatchEvent(
            new Event('change', { bubbles: true })
        );

        console.log('Kolom saran:', fieldSaran.name, fieldSaran.value);
    } else {
        console.error('Kolom saran belum ditemukan!');
        return;
    }

    // 4. Verifikasi
    if (berhasil !== 6 || fieldSaran.value !== 'NULL') {
        console.error('Form belum lengkap. Tidak disimpan.');
        return;
    }

    // 5. Klik SIMPAN
    const tombol = form.querySelector(
        'input.floatL3[type="image"]'
    );

    if (tombol) {
        console.log('Semua siap, menyimpan formulir...');
        tombol.click();
    } else {
        console.error('Tombol Simpan tidak ditemukan!');
    }
})();
