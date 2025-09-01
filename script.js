document.addEventListener('DOMContentLoaded', function() {
    const quizBody = document.getElementById('quiz-body');
    const introText = document.getElementById('intro-text');
    const progressBar = document.getElementById('progress-bar');

    // --- BIẾN ĐỂ THEO DÕI TRẠNG THÁI ---
    const startBtn = document.getElementById('start-btn');
    let currentQuestionIndex = 0;
    let userAnswers = [];

    function showWelcome() {
        quizBody.style.display = 'none';
        progressBar.parentElement.style.display = 'none';
        document.querySelector('#quiz-header h1').style.display = 'none';
        introText.style.display = 'none';
        document.getElementById('welcome-text').style.display = 'block';
        startBtn.style.display = 'inline-block';
    }

    function startQuiz() {
        startBtn.style.display = 'none';
        document.getElementById('welcome-text').style.display = 'none';
        document.querySelector('#quiz-header h1').style.display = 'none';
        introText.style.display = 'none';
        quizBody.style.display = 'block';
        progressBar.parentElement.style.display = 'block';
        displayQuestion();
    }

    // ...existing code...

    showWelcome();
    startBtn.addEventListener('click', startQuiz);

    const questions = [
        {
            question: "1. Trong một sự kiện lớn của câu lạc bộ, bạn muốn mình là ai?",
            options: [
                "a. Người cầm máy ảnh, ghi lại những khoảnh khắc 'cháy' nhất và biến nó thành một video lan tỏa cảm hứng.",
                "b. Người phải đến địa điểm từ rất sớm để kiểm tra từng chi tiết kỹ thuật nhỏ nhặt, đảm bảo mọi thứ sẵn sàng.",
                "c. Người phải đi nhắc nhở mọi người tuân thủ đúng lịch trình và các quy định đã đề ra.",
                "d. Người phải ngồi ở một góc để quản lý quỹ và các vấn đề thu chi, ít được tham gia các hoạt động chính."
            ]
        },
        {
            question: "2. Khi làm bài tập nhóm, bạn thường chọn phần việc nào?",
            options: [
                "a. 'Thổi hồn' cho bài thuyết trình với những thiết kế sáng tạo và hiệu ứng ấn tượng.",
                "b. Đọc những tài liệu tham khảo dài hàng chục trang để tìm ra những thông tin, số liệu khô khan.",
                "c. Tổng hợp bài làm của mọi người, ngồi tỉ mỉ chỉnh sửa từng lỗi chính tả và định dạng.",
                "d. Quản lý các chi phí chung của nhóm như in ấn, photocopy và luôn phải nhắc nhở mọi người tiết kiệm."
            ]
        },
        {
            question: "3. Mạng xã hội đối với bạn là:",
            options: [
                "a. Một sân khấu để thể hiện cá tính, chia sẻ câu chuyện và kết nối với mọi người.",
                "b. Một công cụ để tìm kiếm thông tin cho các chuyến đi hoặc các địa điểm mới.",
                "c. Một thứ khá mất thời gian và cần được sử dụng theo một lịch trình cụ thể.",
                "d. Một nền tảng có thể phát sinh nhiều chi phí nếu không cẩn thận với quảng cáo."
            ]
        },
        {
            question: "4. Khi câu lạc bộ có một thành công lớn, việc đầu tiên bạn nghĩ đến là:",
            options: [
                "a. 'Phải loan tin này ngay!' Nghĩ cách viết một bài đăng thật hay hoặc làm một video ăn mừng thật 'chất'.",
                "b. 'Phải tìm hiểu kỹ nguyên nhân thành công.' Phân tích xem yếu tố nào ở địa điểm hay nội dung đã mang lại kết quả tốt.",
                "c. 'Phải lưu lại quy trình.' Ghi chép lại các bước đã làm để có thể áp dụng cho các lần sau.",
                "d. 'Phải xem lại ngân sách.' Kiểm tra xem thành công này có tốn kém chi phí hơn dự kiến không."
            ]
        },
        {
            question: "5. Nếu phải mô tả công việc mơ ước của mình bằng một từ:",
            options: [
                "a. Sáng tạo",
                "b. Khám phá",
                "c. Ổn định",
                "d. An toàn"
            ]
        },
        {
            question: "6. Bạn nhận được một khoản tiền thưởng nhỏ. Bạn sẽ:",
            options: [
                "a. Mua một món đồ decor thật đẹp cho góc học tập để có thêm cảm hứng.",
                "b. Dành tiền cho một chuyến đi ngẫu hứng trong ngày đến một nơi chưa từng đến.",
                "c. Lập tức ghi nó vào một file theo dõi chi tiêu cá nhân.",
                "d. Bỏ ngay vào heo đất hoặc tài khoản tiết kiệm."
            ]
        },
        {
            question: "7. Thử thách lớn nhất trong một dự án đối với bạn là:",
            options: [
                "a. Làm sao để ý tưởng của mình trở nên khác biệt và không bị nhàm chán.",
                "b. Việc phải đi đến những nơi xa lạ và không có đủ thông tin.",
                "c. Việc phải làm việc với những người không tuân thủ deadline và quy trình.",
                "d. Việc ngân sách bị cắt giảm đột ngột."
            ]
        },
        {
            question: "8. Khi nhìn vào một bức ảnh đẹp, bạn chú ý nhất đến:",
            options: [
                "a. Cảm xúc, màu sắc và câu chuyện mà bức ảnh truyền tải.",
                "b. Địa điểm chụp bức ảnh đó và tò mò không biết nó ở đâu.",
                "c. Bố cục, các đường nét và quy tắc sắp xếp trong ảnh.",
                "d. Chiếc máy ảnh hay thiết bị đã tạo ra bức ảnh đó có đắt tiền không."
            ]
        }
    ];

    const scoreMap = [
        // Câu 1
        { a: { P: 3, H: -1 }, b: { N: 3, T: -1 }, c: { H: 3, P: -1 }, d: { T: 3, N: -1 } },
        // Câu 2
        { a: { P: 3, T: 1 }, b: { N: 3, P: 1 }, c: { H: 3, N: -2 }, d: { T: 3, P: -2 } },
        // Câu 3
        { a: { P: 3, N: -1 }, b: { N: 3, H: -1 }, c: { H: 3, P: -2 }, d: { T: 3, P: -1 } },
        // Câu 4
        { a: { P: 3, H: -1 }, b: { N: 3, H: 1 }, c: { H: 3, P: -2 }, d: { T: 3, N: -1 } },
        // Câu 5
        { a: { P: 3, T: -1 }, b: { N: 3, H: -1 }, c: { H: 3, N: -2 }, d: { T: 3, P: -2 } },
        // Câu 6
        { a: { P: 3, H: -2 }, b: { N: 3, T: 1 }, c: { H: 3, N: -1 }, d: { T: 3, P: -1 } },
        // Câu 7
        { a: { P: 3, T: 1 }, b: { N: 3, P: 1 }, c: { H: 3, P: -2 }, d: { T: 3, H: 1 } },
        // Câu 8
        { a: { P: 3, N: 1 }, b: { N: 3, P: 1 }, c: { H: 3, P: -2 }, d: { T: 3, H: -1 } }
    ];

    const results = {
        P: {
            title: "PR-IT",
            image: "images/P.png",
            description: "Kết quả cho thấy bạn là một người có tư duy hướng ngoại, giàu ý tưởng và có khả năng bẩm sinh trong việc kể chuyện. Bạn không chỉ nhìn thấy sự vật, bạn nhìn thấy câu chuyện và cảm xúc đằng sau chúng. Bạn bị thu hút bởi cái đẹp, sự sáng tạo và có khả năng lan tỏa năng lượng tích cực đến mọi người.",
            role: "Đây chính là những tố chất vàng của một thành viên Ban PR-IT. Tại đây, bạn sẽ là người kiến tạo hình ảnh, là tiếng nói của câu lạc bộ. Công việc của bạn sẽ xoay quanh việc lên ý tưởng cho các chiến dịch truyền thông, thiết kế những ấn phẩm bắt mắt, quay dựng những video truyền cảm hứng và quản lý các kênh mạng xã hội.",
            secondary: {
                N: "Bạn là một 'Nhà sáng tạo ham khám phá'. Bạn không chỉ tạo ra những sản phẩm đẹp, mà còn luôn tìm tòi những câu chuyện, những góc nhìn mới mẻ để lồng ghép vào đó.",
                H: "Bạn là một 'Nhà sáng tạo có tổ chức'. Bạn có thể biến những ý tưởng bay bổng thành một kế hoạch truyền thông bài bản với các bước và thời gian thực hiện rõ ràng.",
                T: "Bạn là một 'Nhà sáng tạo thực tế'. Bạn hiểu rằng sự sáng tạo cũng cần hiệu quả và luôn biết cách tạo ra những sản phẩm ấn tượng nhất trong phạm vi nguồn lực cho phép."
            }
        },
        N: {
            title: "Nội dung",
            image: "images/N.png",
            description: "Bạn có một tâm hồn tò mò, không ngại thử thách và luôn bị thôi thúc bởi những điều mới mẻ. Đối với bạn, không có thông tin nào là nhàm chán. Bạn có khả năng nhìn ra những tiềm năng ẩn giấu và không ngại đi những con đường không ai đi để tìm kiếm thông tin giá trị.",
            role: "Đây là tinh thần của một thành viên Ban Nội dung. Nhiệm vụ của bạn là trở thành người tiên phong, đi tiền trạm, khảo sát các địa điểm và lên kế hoạch chi tiết cho 'phần hồn' của mỗi chương trình tình nguyện, đảm bảo mọi hoạt động đều ý nghĩa và thực tế.",
            secondary: {
                P: "Bạn là một 'Nhà khai phá có tài kể chuyện'. Sau mỗi chuyến đi, bạn có thể biến những thông tin khô khan thành những câu chuyện hấp dẫn để truyền cảm hứng cho người khác.",
                H: "Bạn là một 'Nhà khai phá có hệ thống'. Mọi kế hoạch khảo sát, nghiên cứu của bạn đều được thực hiện một cách rất bài bản và khoa học.",
                T: "Bạn là một 'Nhà khai phá thực tế'. Bạn luôn cân nhắc đến tính khả thi và hiệu quả chi phí trong mỗi kế hoạch, chuyến đi của mình."
            }
        },
        H: {
            title: "Hành chính Nhân sự",
            image: "images/H.png",
            description: "Bạn có một tư duy logic, hệ thống và có khả năng biến sự hỗn loạn trở thành trật tự. Bạn tìm thấy sự hài lòng trong việc lập kế hoạch, sắp xếp và đảm bảo mọi thứ vận hành một cách trơn tru, hiệu quả. Bạn là người đáng tin cậy mà mọi người tìm đến khi cần sự rõ ràng.",
            role: "Những phẩm chất này vô cùng cần thiết tại Ban Hành chính Nhân sự. Bạn sẽ là 'xương sống' của câu lạc bộ, phụ trách quản lý thông tin thành viên, lên kế hoạch và điều phối nhân sự cho các sự kiện, xây dựng các quy trình để bộ máy của CLB hoạt động một cách chuyên nghiệp.",
            secondary: {
                P: "Bạn là một 'Nhà tổ chức biết truyền cảm hứng'. Bạn có thể biến những thông báo nội bộ khô khan trở nên thú vị hơn và biết cách gắn kết mọi người.",
                N: "Bạn là một 'Nhà tổ chức ham học hỏi'. Bạn luôn tìm tòi những công cụ, phương pháp quản lý mới để cải tiến hiệu quả công việc.",
                T: "Bạn là một 'Nhà tổ chức có tầm nhìn xa'. Bạn hiểu rằng một hệ thống tốt sẽ giúp tiết kiệm thời gian và tiền bạc cho cả câu lạc bộ."
            }
        },
        T: {
            title: "Tài chính",
            image: "images/T.png",
            description: "Bạn là một người cẩn trọng, tỉ mỉ và có khả năng làm việc tốt với những con số. Bạn hiểu rõ giá trị của các nguồn lực và luôn suy nghĩ làm thế nào để sử dụng chúng một cách thông minh và hiệu quả nhất. Sự chắc chắn và đáng tin cậy là thương hiệu của bạn.",
            role: "Đây là tố chất không thể thiếu của một thành viên Ban Tài chính. Bạn sẽ là 'tay hòm chìa khóa', quản lý các nguồn quỹ, lên kế hoạch và giám sát thu chi cho các chương trình, đảm bảo sự minh bạch và bền vững về tài chính cho mọi hoạt động của CLB.",
            secondary: {
                P: "Bạn là một 'Nhà quản lý tài chính có tài giao tiếp'. Bạn có khả năng trình bày các con số một cách dễ hiểu và thuyết phục được mọi người về một kế hoạch tài chính hợp lý.",
                N: "Bạn là một 'Nhà quản lý tài chính có chiều sâu'. Bạn không chỉ nhìn vào con số, mà còn tìm hiểu sâu về thị trường, về các cơ hội để tìm kiếm nguồn quỹ mới.",
                H: "Bạn là một 'Nhà quản lý tài chính có hệ thống'. Mọi báo cáo, giấy tờ của bạn đều cực kỳ rõ ràng, logic và được sắp xếp một cách khoa học."
            }
        }
    };
    
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            let questionHTML = `
                <div class="question-block">
                    <p class="question-text">${q.question}</p>`;
            q.options.forEach((option, optionIndex) => {
                const optionChar = String.fromCharCode(97 + optionIndex);
                questionHTML += `
                    <label class="option" data-value="${optionChar}">
                        ${option}
                    </label>`;
            });
            questionHTML += `</div>`;
            quizBody.innerHTML = questionHTML;
            addOptionListeners();
            updateProgressBar();
        } else {
            calculateAndShowResult();
        }
    }
    
    function updateProgressBar() {
        const progressPercent = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }

    function addOptionListeners() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                userAnswers[currentQuestionIndex] = this.dataset.value;
                currentQuestionIndex++;
                displayQuestion();
            });
        });
    }

    function calculateAndShowResult() {
        let scores = { P: 0, N: 0, H: 0, T: 0 };
        userAnswers.forEach((answer, index) => {
            const questionScores = scoreMap[index][answer];
            for (const group in questionScores) {
                scores[group] += questionScores[group];
            }
        });

        // Áp dụng hệ số nhân cho điểm P
        scores.P = Math.round(scores.P * 1.3);
        
        progressBar.style.width = '100%';
        introText.textContent = "Cảm ơn bạn đã hoàn thành bài trắc nghiệm!";

        const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const primaryGroupKey = sortedScores[0][0];
        const secondaryGroupKey = sortedScores[1][0];

        const primaryResult = results[primaryGroupKey];
        const secondaryResult = results[secondaryGroupKey];
        const secondaryDescription = primaryResult.secondary[secondaryGroupKey];

        let resultHTML = `
            <div class="question-block">
                <img src="${primaryResult.image}" alt="Hình ảnh ban ${primaryResult.title}" class="result-image">
                <h2>Kết quả: Bạn là mảnh ghép của ban ${primaryResult.title}</h2>
                <p><strong>Tại sao bạn phù hợp?</strong> ${primaryResult.description}</p>
                <p><strong>Vai trò của bạn trong câu lạc bộ:</strong> ${primaryResult.role}</p>
                <hr>
                <h3>Năng lực phụ của bạn (thuộc ban ${secondaryResult.title}):</h3>
                <p>${secondaryDescription}</p>
            </div>
        `;
        
        quizBody.innerHTML = resultHTML;
    }

    displayQuestion();
});